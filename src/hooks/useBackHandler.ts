import { useEffect, useRef } from 'react';

// Android's hardware/gesture back button has no web equivalent, so dismissible
// UI registers here and `initNativeShell` pops the most recently registered
// handler on each back press. Without this, back would close the whole app
// while a modal is open — the single most jarring thing about a wrapped web
// app on Android.
//
// A stack (rather than a single handler) keeps nesting correct: a dialog
// opened on top of the tour is dismissed first, and only then the tour.
type BackHandler = () => void;

const handlers: BackHandler[] = [];

export function pushBackHandler(handler: BackHandler): () => void {
  handlers.push(handler);
  return () => {
    const index = handlers.lastIndexOf(handler);
    if (index !== -1) handlers.splice(index, 1);
  };
}

// Returns false when nothing was registered, which the caller treats as
// "let Android do its default thing" (leave the app).
export function handleBackPress(): boolean {
  const handler = handlers[handlers.length - 1];
  if (!handler) return false;
  handler();
  return true;
}

// Registers `onBack` for as long as `active` is true. Harmless on the web,
// where the back press never arrives.
export function useBackHandler(active: boolean, onBack: () => void): void {
  // Callers pass inline arrows, so the callback identity changes every render.
  // Going through a ref keeps the registration (and therefore the stack order)
  // tied only to `active`, while still invoking the current callback.
  const onBackRef = useRef(onBack);
  onBackRef.current = onBack;

  useEffect(() => {
    if (!active) return;
    return pushBackHandler(() => onBackRef.current());
  }, [active]);
}
