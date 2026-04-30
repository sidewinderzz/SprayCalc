import { useState } from 'react';
import { MixData, MixHistoryEntry } from '../types';

const STORAGE_KEY = 'agSprayCalcHistory';
const MAX_ENTRIES = 25;

function summarizeMixData(data: MixData): string {
  const parts: string[] = [];
  parts.push(`${data.fillVolume || 0} gal`);
  parts.push(`${data.applicationRate || 0} GPA`);
  const productCount = data.products?.length ?? 0;
  parts.push(`${productCount} product${productCount === 1 ? '' : 's'}`);
  if (data.fieldSize && data.fieldSize > 0) parts.push(`${data.fieldSize} ac`);
  return parts.join(' \u00b7 ');
}

function isSameMixData(a: MixData, b: MixData): boolean {
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}

function generateId(): string {
  return `h${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useMixHistory() {
  const [historyEntries, setHistoryEntries] = useState<MixHistoryEntry[]>([]);

  const persist = (entries: MixHistoryEntry[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (err) {
      console.error('Failed to persist mix history:', err);
    }
  };

  const isValidEntry = (e: unknown): e is MixHistoryEntry => {
    if (!e || typeof e !== 'object') return false;
    const obj = e as Record<string, unknown>;
    return (
      typeof obj.id === 'string' &&
      typeof obj.timestamp === 'number' &&
      typeof obj.summary === 'string' &&
      !!obj.data &&
      typeof obj.data === 'object'
    );
  };

  const loadHistory = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return;
      const validated = parsed.filter(isValidEntry).slice(0, MAX_ENTRIES);
      setHistoryEntries(validated);
      // If we dropped entries during validation, persist the cleaned list
      if (validated.length !== parsed.length) {
        persist(validated);
      }
    } catch (err) {
      console.error('Failed to load mix history:', err);
    }
  };

  // Snapshot the current mix into history. Consecutive identical snapshots
  // are de-duplicated: the existing newest entry's timestamp is bumped
  // instead of adding a new row.
  const addToHistory = (data: MixData) => {
    setHistoryEntries(current => {
      if (current.length > 0 && isSameMixData(current[0].data, data)) {
        const updated = [
          { ...current[0], timestamp: Date.now() },
          ...current.slice(1)
        ];
        persist(updated);
        return updated;
      }
      const newEntry: MixHistoryEntry = {
        id: generateId(),
        timestamp: Date.now(),
        data,
        summary: summarizeMixData(data)
      };
      const updated = [newEntry, ...current].slice(0, MAX_ENTRIES);
      persist(updated);
      return updated;
    });
  };

  const deleteHistoryEntry = (id: string) => {
    setHistoryEntries(current => {
      const updated = current.filter(e => e.id !== id);
      persist(updated);
      return updated;
    });
  };

  const clearHistory = () => {
    setHistoryEntries([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear mix history:', err);
    }
  };

  return {
    historyEntries,
    loadHistory,
    addToHistory,
    deleteHistoryEntry,
    clearHistory
  };
}
