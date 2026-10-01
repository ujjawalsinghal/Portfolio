import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function getSnapshot() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia(QUERY).matches;
}

function subscribe(onChange) {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return () => {};

  const query = window.matchMedia(QUERY);
  if (query.addEventListener) {
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }

  query.addListener?.(onChange);
  return () => query.removeListener?.(onChange);
}

export default function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}