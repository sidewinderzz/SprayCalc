import { isNativeApp } from './platform';

// Sharing and file-saving differ enough between a browser tab and the Android
// shell that both paths live here rather than being scattered through the UI.
//
// Web: the Web Share API when the browser has it, otherwise the caller falls
// back to the clipboard.
// Native: the Capacitor Share plugin (the Android WebView has no
// `navigator.share`), and PDFs are written to the app cache first because
// `doc.save()`'s anchor-download trick silently does nothing in a WebView.
//
// The Capacitor plugins are dynamically imported so the browser bundle never
// pulls them in.

export type ShareOutcome =
  // Handed off to the OS / browser share sheet — nothing more to do.
  | 'shared'
  // User dismissed the sheet. Also nothing more to do, but not a success.
  | 'cancelled'
  // No share mechanism available; the caller should fall back (clipboard).
  | 'unsupported';

function isAbortError(err: unknown): boolean {
  return (
    !!err &&
    typeof err === 'object' &&
    'name' in err &&
    (err as { name?: string }).name === 'AbortError'
  );
}

// The Android share plugin reports a dismissed sheet as a thrown error rather
// than a distinct result, so it has to be recognised by message.
function isNativeShareCancel(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err ?? '');
  return /cancel/i.test(message);
}

export async function shareContent(payload: {
  title: string;
  text: string;
  url?: string;
}): Promise<ShareOutcome> {
  if (isNativeApp()) {
    try {
      const { Share } = await import('@capacitor/share');
      await Share.share({
        title: payload.title,
        text: payload.text,
        url: payload.url,
        dialogTitle: payload.title,
      });
      return 'shared';
    } catch (err) {
      if (isNativeShareCancel(err)) return 'cancelled';
      console.error('Native share failed:', err);
      return 'unsupported';
    }
  }

  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      await navigator.share({ title: payload.title, text: payload.text, url: payload.url });
      return 'shared';
    } catch (err) {
      if (isAbortError(err)) return 'cancelled';
      return 'unsupported';
    }
  }

  return 'unsupported';
}

// Hands a generated PDF to the user. On the web that means a normal download;
// in the Android app the bytes are written to the cache directory and passed
// to the system share sheet, which is where "Save to Files", "Print", Gmail
// and WhatsApp all live.
export async function savePdf(
  base64: string,
  filename: string,
  title: string,
): Promise<ShareOutcome> {
  const { Filesystem, Directory } = await import('@capacitor/filesystem');
  const { Share } = await import('@capacitor/share');

  // Cache rather than Documents: no storage permission is needed, the file is
  // reachable through the FileProvider already declared in the manifest, and
  // Android reclaims it on its own once the user has done something with it.
  await Filesystem.writeFile({
    path: filename,
    data: base64,
    directory: Directory.Cache,
  });

  const { uri } = await Filesystem.getUri({ directory: Directory.Cache, path: filename });

  try {
    await Share.share({ title, files: [uri], dialogTitle: title });
    return 'shared';
  } catch (err) {
    if (isNativeShareCancel(err)) return 'cancelled';
    throw err;
  }
}
