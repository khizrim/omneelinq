import { createChromeStorageStateHookLocal } from 'use-chrome-storage';

import {
  LOCAL_STORAGE_LAZY_LOAD_KEY,
  LOCAL_STORAGE_PASTE_HTML_KEY,
  LOCAL_STORAGE_SETTINGS_KEY,
  LOCAL_STORAGE_SORT_KEY,
  LOCAL_STORAGE_URLS_KEY,
} from 'src/utils/constants';
import type { LocalStorageKey } from 'src/utils/types';

export type SettingsProps = Record<'settings', Record<LocalStorageKey, string>>;

const INITIAL_VALUE = {
  [LOCAL_STORAGE_LAZY_LOAD_KEY]: 'off',
  [LOCAL_STORAGE_PASTE_HTML_KEY]: 'off',
  [LOCAL_STORAGE_SORT_KEY]: 'asc',
  [LOCAL_STORAGE_URLS_KEY]: '',
};

export const useSettingsStore = createChromeStorageStateHookLocal(
  LOCAL_STORAGE_SETTINGS_KEY,
  INITIAL_VALUE
);
