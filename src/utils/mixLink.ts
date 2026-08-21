import LZString from 'lz-string';
import { MixData, MixSplit, Product, SUPPLIED_BY_EACH } from '../types';

const PARAM_NAME = 'm';
const SCHEMA_VERSION = 1;
const MAX_PAYLOAD_CHARS = 1800;

interface SerializedProduct {
  i: number;
  n: string;
  r: number;
  u: string;
  o: string;
  j: number;
  /** suppliedBy — omitted entirely for the common "each pays their own" case. */
  b?: string;
}

interface SerializedSplit {
  i: string;
  n: string;
  a: number;
}

interface SerializedMix {
  v: number;
  fv: number;
  ar: number;
  fs: number;
  iw: number;
  sp: number;
  ft: number;
  p: SerializedProduct[];
  // Added in schema v1 (optional for back-compat with older v1 payloads)
  at?: 'tank' | 'field';
  sm?: 'fullPlusPartial' | 'even';
  /** Cost-split parties. Omitted when the mix isn't shared. */
  sp2?: SerializedSplit[];
}

function serialize(data: MixData): SerializedMix {
  const splits = (data.splits || []).filter(s => s && s.acres > 0);
  return {
    v: SCHEMA_VERSION,
    fv: data.fillVolume || 0,
    ar: data.applicationRate || 0,
    fs: data.fieldSize || 0,
    iw: data.implementWidth || 0,
    sp: data.speed || 0,
    ft: data.fillTime || 0,
    p: (data.products || []).map((p, idx) => ({
      i: typeof p.id === 'number' ? p.id : idx + 1,
      n: typeof p.name === 'string' ? p.name : '',
      r: typeof p.rate === 'number' ? p.rate : 0,
      u: typeof p.unit === 'string' ? p.unit : 'fl oz/acre',
      o: typeof p.outputFormat === 'string' ? p.outputFormat : 'auto',
      j: typeof p.jugSize === 'number' ? p.jugSize : 128,
      ...(p.suppliedBy && p.suppliedBy !== SUPPLIED_BY_EACH ? { b: p.suppliedBy } : {}),
    })),
    at: data.activeTab === 'field' ? 'field' : 'tank',
    sm: data.splitMode === 'even' ? 'even' : 'fullPlusPartial',
    ...(splits.length > 0
      ? {
          sp2: splits.map(s => ({
            i: s.id,
            n: typeof s.name === 'string' ? s.name : '',
            a: typeof s.acres === 'number' ? s.acres : 0,
          })),
        }
      : {}),
  };
}

function deserialize(raw: SerializedMix): MixData {
  const splits: MixSplit[] = (raw.sp2 || [])
    .filter(s => !!s && typeof s.i === 'string')
    .map(s => ({
      id: s.i,
      name: typeof s.n === 'string' ? s.n : '',
      acres: typeof s.a === 'number' ? s.a : 0,
    }));
  const splitIds = new Set(splits.map(s => s.id));
  const products: Product[] = (raw.p || []).map((sp, idx) => ({
    id: typeof sp.i === 'number' ? sp.i : idx + 1,
    name: typeof sp.n === 'string' ? sp.n : '',
    rate: typeof sp.r === 'number' ? sp.r : 0,
    unit: typeof sp.u === 'string' ? sp.u : 'fl oz/acre',
    tankAmount: 0,
    outputFormat: typeof sp.o === 'string' ? sp.o : 'auto',
    jugSize: typeof sp.j === 'number' ? sp.j : 128,
    // Drop a supplier whose party didn't survive the link — otherwise the
    // product would show as furnished by a party that isn't in the mix.
    suppliedBy: typeof sp.b === 'string' && splitIds.has(sp.b) ? sp.b : SUPPLIED_BY_EACH,
  }));
  return {
    splits,
    fillVolume: typeof raw.fv === 'number' ? raw.fv : 0,
    applicationRate: typeof raw.ar === 'number' ? raw.ar : 0,
    fieldSize: typeof raw.fs === 'number' ? raw.fs : 0,
    implementWidth: typeof raw.iw === 'number' ? raw.iw : 0,
    speed: typeof raw.sp === 'number' ? raw.sp : 0,
    fillTime: typeof raw.ft === 'number' ? raw.ft : 0,
    products,
    activeTab: raw.at === 'field' ? 'field' : 'tank',
    splitMode: raw.sm === 'even' ? 'even' : 'fullPlusPartial',
  };
}

export interface EncodedMixLink {
  param: string;
  url: string;
  tooLarge: boolean;
}

function originAndPath(): string {
  if (typeof window === 'undefined') return '';
  const { origin, pathname } = window.location;
  return `${origin}${pathname}`;
}

export function encodeMixToParam(data: MixData): string {
  const payload = JSON.stringify(serialize(data));
  return LZString.compressToEncodedURIComponent(payload);
}

export function buildMixLink(data: MixData): EncodedMixLink {
  const param = encodeMixToParam(data);
  const base = originAndPath();
  const url = `${base}?${PARAM_NAME}=${param}`;
  return {
    param,
    url,
    tooLarge: param.length > MAX_PAYLOAD_CHARS,
  };
}

export function decodeMixFromParam(param: string): MixData | null {
  if (!param) return null;
  try {
    const decompressed = LZString.decompressFromEncodedURIComponent(param);
    if (!decompressed) return null;
    const parsed = JSON.parse(decompressed);
    if (!parsed || typeof parsed !== 'object') return null;
    if (typeof parsed.v !== 'number') return null;
    if (parsed.v !== SCHEMA_VERSION) return null;
    return deserialize(parsed as SerializedMix);
  } catch (_err) {
    // Malformed link — silently ignore so the app still loads normally
    return null;
  }
}

export function readMixFromCurrentURL(): MixData | null {
  if (typeof window === 'undefined') return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get(PARAM_NAME);
    if (!raw) return null;
    return decodeMixFromParam(raw);
  } catch (_err) {
    return null;
  }
}

export function clearMixParamFromURL(): void {
  if (typeof window === 'undefined') return;
  try {
    const url = new URL(window.location.href);
    if (!url.searchParams.has(PARAM_NAME)) return;
    url.searchParams.delete(PARAM_NAME);
    const newSearch = url.searchParams.toString();
    const newUrl = `${url.pathname}${newSearch ? `?${newSearch}` : ''}${url.hash}`;
    window.history.replaceState({}, '', newUrl);
  } catch (_err) {
    // ignore — failure to clean the URL is not user-visible
  }
}

export const MIX_LINK_PARAM = PARAM_NAME;
export const MIX_LINK_MAX_CHARS = MAX_PAYLOAD_CHARS;
