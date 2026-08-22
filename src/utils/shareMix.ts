import { buildSharePayload, ExportState } from './export';
import { trackEvent } from './analytics';

// Sharing is reachable from two places — the toolbar in the Mix Summary and
// the ⋮ menu — so the behaviour lives here rather than in either component.
// Two copies of this would drift, and the last thing to drift in the export
// path silently changed what a shared link said.

function isAbort(err: unknown): boolean {
  return (
    !!err &&
    typeof err === 'object' &&
    'name' in err &&
    (err as { name?: string }).name === 'AbortError'
  );
}

/**
 * Share the current mix: the native share sheet where available, otherwise the
 * link on the clipboard. Falls back to the full summary text when the mix is
 * too large to encode in a URL.
 */
export async function shareMix(
  state: ExportState,
  onFeedback: (msg: string) => void,
): Promise<void> {
  const payload = buildSharePayload(state);
  trackEvent('share_mix', {
    product_count: state.products.length,
    fill_volume: state.fillVolume,
    application_rate: state.applicationRate,
    method: typeof navigator.share === 'function' ? 'web_share' : 'clipboard',
    too_large: payload.tooLarge,
  });

  const shortText = `${payload.text.split('\n').slice(0, 6).join('\n')}\n\nOpen this mix in SprayCalc:`;

  if (navigator.share) {
    if (!payload.tooLarge) {
      try {
        await navigator.share({ title: payload.title, text: shortText, url: payload.url });
        return;
      } catch (err) {
        if (isAbort(err)) return;
      }
    }
    try {
      await navigator.share({ title: payload.title, text: payload.text });
      return;
    } catch (err) {
      if (isAbort(err)) return;
    }
  }

  const clipboardText = payload.tooLarge ? payload.text : `${shortText} ${payload.url}`;
  try {
    await navigator.clipboard.writeText(clipboardText);
    onFeedback(payload.tooLarge ? 'Copied!' : 'Link copied!');
  } catch (_) {
    onFeedback('Copy failed');
  }
  setTimeout(() => onFeedback(''), 2000);
}
