import type { SetStateAction } from 'react';
import React, { useCallback, useMemo } from 'react';

import { Flex, spacing, ThemeProvider } from '@gravity-ui/uikit';

import { Form, TopBar } from 'src/components';

import { extractUrls } from 'src/helpers/extract-urls-from-text';
import { getLocalstorageItem } from 'src/helpers/get-localstorage-item';
import { getUrlsArray } from 'src/helpers/get-urls-array';
import { parseTabUrls } from 'src/helpers/parse-tab-urls';
import { removeLocalstorageItem } from 'src/helpers/remove-localstorage-item';
import { setLocalstorageItem } from 'src/helpers/set-localstorage-item';
import { useErrorMessage } from 'src/hooks/useErrorMessage';
import { useModEnterKeyPress } from 'src/hooks/useModEnterKeyPress';
import { usePaste } from 'src/hooks/usePaste';
import { useUrls } from 'src/hooks/useUrls';
import {
  LOCAL_STORAGE_LAZY_LOAD_KEY,
  LOCAL_STORAGE_PASTE_HTML_KEY,
  LOCAL_STORAGE_SORT_KEY,
  LOCAL_STORAGE_URLS_KEY,
  VALIDATION_ERROR_TEXTS,
} from 'src/utils/constants';

import { getUniqueUrlsArray } from '../../helpers/get-unique-urls-array';
import { sortUrls } from '../../helpers/sort-urls';

export const App = () => {
  const { urls, setUrls, isEmptyList, setIsEmptyList } = useUrls();
  const { errorMessage, setErrorMessage, resetErrorMessage } =
    useErrorMessage();

  const isPasteHtml =
    getLocalstorageItem(LOCAL_STORAGE_PASTE_HTML_KEY) === 'on';

  const extractedUrls = useMemo(() => extractUrls(urls), [urls]);
  const urlsArray = useMemo(
    () => getUrlsArray(extractedUrls.text),
    [extractedUrls]
  );

  const handleErrors = (message: string) => {
    setErrorMessage(message);
    setIsEmptyList(true);
  };

  const handlePaste = (e: ClipboardEvent, pasteHtml: boolean) => {
    const textarea = e.target as HTMLTextAreaElement;

    const [start, end] = [
      textarea.selectionStart || 0,
      textarea.selectionEnd || 0,
    ];
    const textAreaValue = textarea.value;

    const clipboardDataKey = pasteHtml ? 'text/html' : 'text/plain';
    const clipboardData = e.clipboardData?.getData(clipboardDataKey) || '';

    const updatedValue =
      textAreaValue.substring(0, start) +
      clipboardData +
      textAreaValue.substring(end);

    setUrls(updatedValue);
    setLocalstorageItem(LOCAL_STORAGE_URLS_KEY, updatedValue);

    textarea.selectionStart = start + clipboardData.length;
    textarea.selectionEnd = start + clipboardData.length;

    setIsEmptyList(!updatedValue);
  };

  const handleInputChange = useCallback(
    (e: { target: { value: SetStateAction<string> } }) => {
      const inputValue = String(e.target.value);

      if (inputValue) {
        resetErrorMessage();
        setUrls(inputValue);
        setIsEmptyList(false);
        setLocalstorageItem(LOCAL_STORAGE_URLS_KEY, inputValue);
      } else {
        setUrls('');
        setIsEmptyList(true);
        removeLocalstorageItem(LOCAL_STORAGE_URLS_KEY);
        removeLocalstorageItem(LOCAL_STORAGE_SORT_KEY);
        resetErrorMessage();
      }
    },
    [setUrls, setIsEmptyList, resetErrorMessage]
  );

  const handleUrlExtraction = useCallback(() => {
    setUrls(extractedUrls.text);

    localStorage.setItem(LOCAL_STORAGE_URLS_KEY, extractedUrls.text);

    if (!extractedUrls.hasValidUrls) {
      handleErrors(VALIDATION_ERROR_TEXTS.noContent);
    }

    return extractedUrls;
  }, [urls, extractedUrls, setUrls, handleErrors]);

  const handleTabsParsing = useCallback(async () => {
    try {
      const currentTabs = await parseTabUrls();

      const updatedUrls = urls
        ? `${urls}\n${currentTabs.join('\n')}`
        : currentTabs.join('\n');

      setUrls(updatedUrls);
      setIsEmptyList(false);
    } catch (error) {
      console.error('Error parsing tab URLs:', error);
    }
  }, [urls, setUrls, setIsEmptyList]);

  const handleRemoveDuplicates = useCallback(() => {
    const extractedUrls = handleUrlExtraction();

    if (!extractedUrls.hasValidUrls) {
      handleErrors(VALIDATION_ERROR_TEXTS.invalid);
      return;
    }

    const urlsArray = getUrlsArray(extractedUrls.text);

    if (!urlsArray.length) {
      handleErrors(VALIDATION_ERROR_TEXTS.empty);
      return;
    }

    const uniqueUrlsArray = getUniqueUrlsArray(urlsArray);
    const uniqueUrlsString = uniqueUrlsArray.join('\n');

    setUrls(uniqueUrlsString);
    setLocalstorageItem(LOCAL_STORAGE_URLS_KEY, uniqueUrlsString);
    resetErrorMessage();
  }, [handleUrlExtraction, urls, setUrls, resetErrorMessage, handleErrors]);

  const handleSort = useCallback(
    (sortDirection: 'asc' | 'desc') => {
      const extractedUrls = handleUrlExtraction();

      if (!extractedUrls.hasValidUrls) {
        handleErrors(VALIDATION_ERROR_TEXTS.invalid);
      } else {
        const urlsArray = getUrlsArray(extractedUrls.text);

        if (!urlsArray.length) {
          handleErrors(VALIDATION_ERROR_TEXTS.empty);
        } else {
          const sortedUrls = sortUrls(urlsArray, sortDirection);

          setUrls(sortedUrls.join('\n'));
          setLocalstorageItem(LOCAL_STORAGE_URLS_KEY, sortedUrls.join('\n'));
          setLocalstorageItem(LOCAL_STORAGE_SORT_KEY, sortDirection);

          setIsEmptyList(false);
          resetErrorMessage();
        }
      }
    },
    [urls, handleUrlExtraction, setUrls, setIsEmptyList, resetErrorMessage]
  );

  const handleOpenAllUrls = useCallback(() => {
    const extractedUrls = handleUrlExtraction();

    if (!extractedUrls.hasValidUrls) {
      handleErrors(VALIDATION_ERROR_TEXTS.invalid);
    } else {
      const isLazyLoad =
        getLocalstorageItem(LOCAL_STORAGE_LAZY_LOAD_KEY) === 'on';

      if (!urlsArray.length) {
        handleErrors(VALIDATION_ERROR_TEXTS.empty);
      } else {
        void chrome.runtime.sendMessage({
          action: 'openAllUrls',
          urls: urlsArray,
          lazyLoad: isLazyLoad,
        });
      }
    }
  }, [urls, handleUrlExtraction, urlsArray, handleErrors]);

  useModEnterKeyPress(handleOpenAllUrls);
  usePaste(handlePaste, isPasteHtml);

  return (
    <ThemeProvider>
      <Flex
        className={spacing({ pt: 8, px: 8, pb: 10 })}
        direction={'column'}
        width={620}
        gap={4}
      >
        <TopBar />
        <Form
          value={urls}
          urlsCount={extractedUrls.count}
          disabled={isEmptyList}
          errorMessage={errorMessage}
          onSort={handleSort}
          onChange={handleInputChange}
          onRemoveDuplicates={handleRemoveDuplicates}
          onParseTabs={handleTabsParsing}
          onExtract={handleUrlExtraction}
          onOpenAll={handleOpenAllUrls}
        />
      </Flex>
    </ThemeProvider>
  );
};
