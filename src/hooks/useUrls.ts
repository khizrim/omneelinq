import { useEffect, useState } from 'react';

import { getLocalstorageItem } from 'src/helpers/get-localstorage-item';
import { removeLocalstorageItem } from 'src/helpers/remove-localstorage-item';
import {
  LOCAL_STORAGE_SORT_KEY,
  LOCAL_STORAGE_URLS_KEY,
} from 'src/utils/constants';

import { useErrorMessage } from './useErrorMessage';

export const useUrls = () => {
  const { resetErrorMessage } = useErrorMessage();

  const [urls, setUrls] = useState<string>(
    getLocalstorageItem(LOCAL_STORAGE_URLS_KEY) || ''
  );

  const [isEmptyList, setIsEmptyList] = useState<boolean>(false);

  useEffect(() => {
    if (urls === '') {
      setIsEmptyList(urls === '');
      removeLocalstorageItem(LOCAL_STORAGE_SORT_KEY);
      resetErrorMessage();
    }
  }, [urls]);

  return { urls, setUrls, isEmptyList, setIsEmptyList };
};
