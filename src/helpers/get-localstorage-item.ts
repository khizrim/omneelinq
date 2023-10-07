import type { LocalStorageKey } from 'src/utils/types';

export const getLocalstorageItem = (key: LocalStorageKey) =>
  localStorage.getItem(key);
