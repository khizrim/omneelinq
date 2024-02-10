import { useCallback, useEffect, useMemo, useState } from 'react';

import { useSettingsStore } from 'src/store/store';
import { LOCAL_STORAGE_URLS_KEY } from 'src/utils/constants';

import { useErrorMessage } from './useErrorMessage';

export const useUrls = () => {
  const [settings, setSettings] = useSettingsStore();

  const urls = useMemo(() => settings[LOCAL_STORAGE_URLS_KEY], [settings]);

  const { resetErrorMessage } = useErrorMessage();

  const [isEmptyList, setIsEmptyList] = useState<boolean>(false);

  const setUrls = useCallback(
    (updatedUrls: string) => {
      setSettings((prevState) => {
        return {
          ...prevState,
          [LOCAL_STORAGE_URLS_KEY]: updatedUrls,
        };
      });
    },
    [setSettings]
  );

  useEffect(() => {
    if (urls === '') {
      setIsEmptyList(true);
      resetErrorMessage();
    } else {
      setIsEmptyList(false);
    }
  }, [urls]);

  return { urls, setUrls, isEmptyList, setIsEmptyList };
};
