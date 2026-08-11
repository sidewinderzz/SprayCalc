import { useEffect, useRef, useState } from 'react';
import type { User } from 'firebase/auth';
import { SavedMix, MixData } from '../types';
import { fetchCloudMixes, uploadCloudMix, deleteCloudMix } from '../utils/cloudMixes';
import { describeCloudError, flushQueue, reportSyncState, setActiveUid } from '../utils/cloudSync';

const LS_MIXES = 'agSprayCalcMixes';

// Merge local and cloud mixes by name. On a name collision the copy with the
// newer updatedAt wins; ties (including legacy saves with no timestamp) go to
// the cloud copy since that's the one shared across devices.
function mergeMixes(local: SavedMix[], cloud: SavedMix[]): SavedMix[] {
  const byName = new Map<string, SavedMix>();
  for (const mix of local) byName.set(mix.name, mix);
  for (const mix of cloud) {
    const existing = byName.get(mix.name);
    if (!existing || (mix.updatedAt ?? 0) >= (existing.updatedAt ?? 0)) {
      byName.set(mix.name, mix);
    }
  }
  return Array.from(byName.values());
}

function persistLocal(mixes: SavedMix[]) {
  try {
    localStorage.setItem(LS_MIXES, JSON.stringify(mixes));
  } catch (err) {
    console.error('Failed to persist mixes locally:', err);
  }
}

export function useMixStorage(
  onMixLoaded: (data: MixData) => void,
  onFeedback: (msg: string) => void,
  onCloseThreeDotMenu: () => void,
  user: User | null = null
) {
  const [savedMixes, setSavedMixes] = useState<SavedMix[]>([]);
  const [showSaveMixDialog, setShowSaveMixDialog] = useState(false);
  const [mixNameInput, setMixNameInput] = useState('');

  // Ref mirror of savedMixes so the async cloud-sync effect can read the
  // latest list without re-running on every local change.
  const savedMixesRef = useRef<SavedMix[]>([]);
  useEffect(() => {
    savedMixesRef.current = savedMixes;
  }, [savedMixes]);

  const flash = (msg: string, ms = 2500) => {
    onFeedback(msg);
    setTimeout(() => onFeedback(''), ms);
  };

  // Keep the shared sync layer pointed at the current user so queued writes
  // are retried against the right account when connectivity returns.
  useEffect(() => {
    setActiveUid(user?.uid ?? null);
  }, [user?.uid]);

  // When a user signs in, pull their cloud mixes, merge with local saves, and
  // push any local-only (or locally newer) mixes back up. Uploads are awaited
  // so the "synced" message reflects what actually reached the database rather
  // than what was merely attempted.
  useEffect(() => {
    if (!user) return;
    const uid = user.uid;
    let cancelled = false;

    (async () => {
      reportSyncState('syncing', 'Syncing mixes…');
      try {
        // Retry anything left over from a previous session first, so an
        // earlier failed save is not overwritten by a stale cloud copy.
        await flushQueue(uid);

        const cloud = await fetchCloudMixes(uid);
        if (cancelled) return;

        const local = savedMixesRef.current;
        const merged = mergeMixes(local, cloud);
        setSavedMixes(merged);
        persistLocal(merged);

        const cloudByName = new Map(cloud.map(m => [m.name, m]));
        const toUpload = merged.filter(mix => {
          const cloudCopy = cloudByName.get(mix.name);
          return !cloudCopy || (mix.updatedAt ?? 0) > (cloudCopy.updatedAt ?? 0);
        });

        let uploaded = 0;
        let failure: ReturnType<typeof describeCloudError> | null = null;
        for (const mix of toUpload) {
          if (cancelled) return;
          try {
            await uploadCloudMix(uid, mix);
            uploaded++;
          } catch (err) {
            failure = describeCloudError(err);
            console.error(`Failed to upload mix "${mix.name}":`, err);
            // The first failure will repeat for every remaining mix (the
            // usual cause is unpublished rules or no connection). They stay
            // queued for retry, so stop here instead of hammering.
            break;
          }
        }
        if (cancelled) return;

        if (failure) {
          flash(`Mixes not synced — ${failure.message}`, 6000);
        } else if (uploaded > 0) {
          flash(`Mixes synced (${uploaded} uploaded)`);
          reportSyncState('ok', 'All changes saved');
        } else if (merged.length > 0) {
          flash('Mixes synced');
          reportSyncState('ok', 'All changes saved');
        } else {
          reportSyncState('ok', 'All changes saved');
        }
      } catch (err) {
        if (cancelled) return;
        const info = describeCloudError(err);
        console.error('Failed to sync mixes from cloud:', err);
        reportSyncState('error', info.message, info.code);
        flash(`Cloud sync failed — ${info.message}`, 6000);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  // Load all saved mixes from localStorage
  const loadAllMixes = () => {
    try {
      const raw = localStorage.getItem(LS_MIXES);
      if (raw) {
        const mixes = JSON.parse(raw);
        setSavedMixes(Array.isArray(mixes) ? mixes : []);
      }
    } catch (err) {
      console.error('Failed to load saved mixes:', err);
    }
  };

  // Open the Save Mix dialog
  const openSaveMixDialog = () => {
    setMixNameInput('');
    setShowSaveMixDialog(true);
    onCloseThreeDotMenu();
  };

  // Save a named mix — receives current mix data snapshot as argument
  const saveMix = async (getCurrentMixData: () => MixData) => {
    const name = mixNameInput.trim();
    if (!name) return;

    let newMix: SavedMix;
    try {
      const mixData = getCurrentMixData();
      newMix = { name, data: mixData, updatedAt: Date.now() };
      const existing = [...savedMixes];
      const idx = existing.findIndex(m => m.name === name);
      if (idx >= 0) existing[idx] = newMix;
      else existing.push(newMix);

      setSavedMixes(existing);
      persistLocal(existing);
      // Also keep legacy single-settings save
      localStorage.setItem('agSprayCalcSettings', JSON.stringify(mixData));

      setShowSaveMixDialog(false);
      setMixNameInput('');
    } catch (err) {
      console.error('Failed to save mix:', err);
      flash('Error saving mix');
      return;
    }

    if (!user) {
      flash(`"${name}" saved!`);
      return;
    }

    // Signed in: the save isn't done until Firestore acknowledges it.
    flash(`Saving "${name}"…`, 15000);
    try {
      await uploadCloudMix(user.uid, newMix);
      flash(`"${name}" saved to your account`);
    } catch (err) {
      const info = describeCloudError(err);
      console.error('Failed to upload mix:', err);
      flash(`"${name}" saved on this device only — ${info.message}`, 6000);
    }
  };

  // Load a saved mix into the calculator
  const loadMix = (mixData: MixData) => {
    try {
      onMixLoaded(mixData);
      onCloseThreeDotMenu();
      flash('Mix loaded!');
    } catch (err) {
      console.error('Failed to load mix:', err);
    }
  };

  // Delete a saved mix
  const deleteMix = async (name: string) => {
    const updated = savedMixes.filter(m => m.name !== name);
    setSavedMixes(updated);
    persistLocal(updated);
    if (!user) return;
    try {
      await deleteCloudMix(user.uid, name);
    } catch (err) {
      const info = describeCloudError(err);
      console.error('Failed to delete cloud mix:', err);
      flash(`Removed here, but not from your account — ${info.message}`, 6000);
    }
  };

  return {
    savedMixes,
    showSaveMixDialog,
    setShowSaveMixDialog,
    mixNameInput,
    setMixNameInput,
    loadAllMixes,
    openSaveMixDialog,
    saveMix,
    loadMix,
    deleteMix,
  };
}
