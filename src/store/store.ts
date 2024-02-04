import { createChromeStorageStateHookLocal } from 'use-chrome-storage';

import {
  LOCAL_STORAGE_LAZY_LOAD_KEY,
  LOCAL_STORAGE_NOTIFICATIONS_KEY,
  LOCAL_STORAGE_PASTE_HTML_KEY,
  LOCAL_STORAGE_SETTINGS_KEY,
  LOCAL_STORAGE_SORT_KEY,
  LOCAL_STORAGE_URLS_KEY,
} from 'src/utils/constants';

const INITIAL_VALUE = {
  [LOCAL_STORAGE_LAZY_LOAD_KEY]: 'off',
  [LOCAL_STORAGE_PASTE_HTML_KEY]: 'off',
  [LOCAL_STORAGE_SORT_KEY]: 'asc',
  [LOCAL_STORAGE_URLS_KEY]: '',
  [LOCAL_STORAGE_NOTIFICATIONS_KEY]: 'on',
};

export const useSettingsStore = createChromeStorageStateHookLocal(
  LOCAL_STORAGE_SETTINGS_KEY,
  INITIAL_VALUE
);
