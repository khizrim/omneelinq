import type { LocalStorageKey } from 'src/utils/types';

export const removeLocalstorageItem = (key: LocalStorageKey) =>
  localStorage.removeItem(key);
