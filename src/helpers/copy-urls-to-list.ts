import {
  LOCAL_STORAGE_SETTINGS_KEY,
  LOCAL_STORAGE_URLS_KEY,
} from 'src/utils/constants';

export const copyUrlsToList = async (urls: string[]) => {
  const { [LOCAL_STORAGE_SETTINGS_KEY]: currentSettings } =
    await chrome.storage.local.get(LOCAL_STORAGE_SETTINGS_KEY);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const currentUrls = currentSettings?.[LOCAL_STORAGE_URLS_KEY] as string;

  const updatedUrls = currentUrls
    ? `${currentUrls}\n${urls.join('\n')}`
    : urls.join('\n');

  await chrome.storage.local.set({
    [LOCAL_STORAGE_SETTINGS_KEY]: {
      ...((currentSettings || {}) as { LocalStorageKey: string }), // Type assertion here
      [LOCAL_STORAGE_URLS_KEY]: updatedUrls,
    },
  });
};
