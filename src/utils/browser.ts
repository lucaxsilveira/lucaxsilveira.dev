'use client';

export const isMac =
  typeof window !== 'undefined' &&
  window.navigator.platform.toUpperCase().indexOf('MAC') >= 0;
