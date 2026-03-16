import { useState } from 'react';
import { SavedMix, MixData } from '../types';

export function useMixStorage(
  onMixLoaded: (data: MixData) => void,
  onFeedback: (msg: string) => void,
  onCloseThreeDotMenu: () => void
) {
  const [savedMixes, setSavedMixes] = useState<SavedMix[]>([]);
  const [showSaveMixDialog, setShowSaveMixDialog] = useState(false);
  const [mixNameInput, setMixNameInput] = useState('');

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
      const existing = [...savedMixes];
      const idx = existing.findIndex(m => m.name === name);
      if (idx >= 0) {
        existing[idx] = { name, data: mixData };
      } else {
        existing.push({ name, data: mixData });
      }
      setSavedMixes(existing);
      localStorage.setItem('agSprayCalcMixes', JSON.stringify(existing));
      // Also keep legacy single-settings save
      localStorage.setItem('agSprayCalcSettings', JSON.stringify(mixData));
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
