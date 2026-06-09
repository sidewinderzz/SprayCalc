import { useEffect, useRef, useState } from 'react';
import type { User } from 'firebase/auth';
import { SavedMix, MixData } from '../types';
import { fetchCloudMixes, uploadCloudMix, deleteCloudMix } from '../utils/cloudMixes';

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

  // Load all saved mixes from localStorage
  const loadAllMixes = () => {
    try {
      const raw = localStorage.getItem('agSprayCalcMixes');
      if (raw) {
        const mixes = JSON.parse(raw);
        setSavedMixes(Array.isArray(mixes) ? mixes : []);
      }
    } catch (err) {
      console.error('Failed to load saved mixes:', err);
    }
  };

  // When a user signs in, pull their cloud mixes, merge with local saves,
  // and push any local-only (or locally newer) mixes back up.
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      try {
        const cloud = await fetchCloudMixes(user.uid);
        if (cancelled) return;

        const local = savedMixesRef.current;
        const merged = mergeMixes(local, cloud);
        setSavedMixes(merged);
        try {
          localStorage.setItem('agSprayCalcMixes', JSON.stringify(merged));
        } catch (_) {}

        const cloudByName = new Map(cloud.map(m => [m.name, m]));
        for (const mix of merged) {
          const cloudCopy = cloudByName.get(mix.name);
          if (!cloudCopy || (mix.updatedAt ?? 0) > (cloudCopy.updatedAt ?? 0)) {
            uploadCloudMix(user.uid, mix).catch(err =>
              console.error('Failed to upload mix:', err)
            );
          }
        }

        if (merged.length > 0) {
          onFeedback('Mixes synced');
          setTimeout(() => onFeedback(''), 2500);
        }
      } catch (err) {
        console.error('Failed to sync mixes from cloud:', err);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  // Open the Save Mix dialog
  const openSaveMixDialog = () => {
    setMixNameInput('');
    setShowSaveMixDialog(true);
    onCloseThreeDotMenu();
  };

  // Save a named mix — receives current mix data snapshot as argument
  const saveMix = (getCurrentMixData: () => MixData) => {
    const name = mixNameInput.trim();
    if (!name) return;

    try {
      const mixData = getCurrentMixData();
      const newMix: SavedMix = { name, data: mixData, updatedAt: Date.now() };
      const existing = [...savedMixes];
      const idx = existing.findIndex(m => m.name === name);
      if (idx >= 0) {
        existing[idx] = newMix;
      } else {
        existing.push(newMix);
      }
      setSavedMixes(existing);
      localStorage.setItem('agSprayCalcMixes', JSON.stringify(existing));
      // Also keep legacy single-settings save
      localStorage.setItem('agSprayCalcSettings', JSON.stringify(mixData));
      if (user) {
        uploadCloudMix(user.uid, newMix).catch(err =>
          console.error('Failed to upload mix:', err)
        );
      }
      setShowSaveMixDialog(false);
      setMixNameInput('');
      onFeedback(`"${name}" saved!`);
      setTimeout(() => onFeedback(''), 2500);
    } catch (err) {
      console.error('Failed to save mix:', err);
      onFeedback('Error saving mix');
      setTimeout(() => onFeedback(''), 2500);
    }
  };

  // Load a saved mix into the calculator
  const loadMix = (mixData: MixData) => {
    try {
      onMixLoaded(mixData);
      onCloseThreeDotMenu();
      onFeedback('Mix loaded!');
      setTimeout(() => onFeedback(''), 2500);
    } catch (err) {
      console.error('Failed to load mix:', err);
    }
  };

  // Delete a saved mix
  const deleteMix = (name: string) => {
    const updated = savedMixes.filter(m => m.name !== name);
    setSavedMixes(updated);
    localStorage.setItem('agSprayCalcMixes', JSON.stringify(updated));
    if (user) {
      deleteCloudMix(user.uid, name).catch(err =>
        console.error('Failed to delete cloud mix:', err)
      );
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
    deleteMix
  };
}
