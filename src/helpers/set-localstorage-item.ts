import type { LocalStorageKey } from 'src/utils/types';

export const setLocalstorageItem = (key: LocalStorageKey, value: string) =>
  localStorage.setItem(key, value);
