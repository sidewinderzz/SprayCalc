type GtagArgs = unknown[];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
  }
}

let initialized = false;
let measurementId: string | null = null;

function getMeasurementId(): string | null {
  const raw = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) ?? '';
  const id = raw.trim();
  return id ? id : null;
}

export function initAnalytics(): void {
  if (initialized) return;
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const id = getMeasurementId();
  if (!id) return;

  measurementId = id;
  initialized = true;

  try {
    window.dataLayer = window.dataLayer || [];
    // gtag.js only processes commands pushed as the raw `arguments` object.
    // Pushing a plain array (e.g. [...args]) silently drops every command —
    // no config is applied and no hits are ever sent. Match Google's snippet.
    function gtag(..._args: GtagArgs) {
      window.dataLayer!.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', id, { send_page_view: false });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    script.onerror = () => {
      // Script blocked or offline — leave gtag stub in place; calls become no-ops.
    };
    document.head.appendChild(script);
  } catch (_err) {
    // Never let analytics break the app
  }
}

// Query params we never want to send to analytics (they contain user mix data).
const SENSITIVE_PARAMS = ['m'];

function sanitizedDefaultPath(): string {
  if (typeof window === 'undefined') return '/';
  try {
    const url = new URL(window.location.href);
    for (const p of SENSITIVE_PARAMS) url.searchParams.delete(p);
    const search = url.searchParams.toString();
    return `${url.pathname}${search ? `?${search}` : ''}`;
  } catch (_err) {
    return '/';
  }
}

export function trackPageView(path?: string, title?: string): void {
  if (!initialized || !measurementId) return;
  try {
    window.gtag?.('event', 'page_view', {
      page_path: path ?? sanitizedDefaultPath(),
      page_title: title ?? (typeof document !== 'undefined' ? document.title : undefined),
    });
  } catch (_err) {
    // ignore
  }
}

export function trackEvent(name: string, params?: Record<string, string | number | boolean | undefined>): void {
  if (!initialized) return;
  try {
    window.gtag?.('event', name, params ?? {});
  } catch (_err) {
    // ignore
  }
}
