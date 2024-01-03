import type { SetStateAction } from 'react';
import React, { useCallback, useMemo } from 'react';

import { Flex, spacing, ThemeProvider } from '@gravity-ui/uikit';

import type { SortDirection } from 'src/components';
import { Form, TopBar } from 'src/components';

import { extractUrls } from 'src/helpers/extract-urls-from-text';
import { getLinksFromHtml } from 'src/helpers/get-links-from-html';
import { getUniqueUrlsArray } from 'src/helpers/get-unique-urls-array';
import { getUrlsArray } from 'src/helpers/get-urls-array';
import { parseTabUrls } from 'src/helpers/parse-tab-urls';
import { sortUrls } from 'src/helpers/sort-urls';
import { useErrorMessage } from 'src/hooks/useErrorMessage';
import { useModEnterKeyPress } from 'src/hooks/useModEnterKeyPress';
import { usePaste } from 'src/hooks/usePaste';
import { useUrls } from 'src/hooks/useUrls';
import { useSettingsStore } from 'src/store/store';
import {
  LOCAL_STORAGE_LAZY_LOAD_KEY,
  LOCAL_STORAGE_PASTE_HTML_KEY,
  LOCAL_STORAGE_SORT_KEY,
  LOCAL_STORAGE_URLS_KEY,
  VALIDATION_ERROR_TEXTS,
} from 'src/utils/constants';

export const App = () => {
  const [settings, setSettings] = useSettingsStore();

  const { urls, setUrls, isEmptyList, setIsEmptyList } = useUrls();
  const { errorMessage, setErrorMessage, resetErrorMessage } =
    useErrorMessage();

  const extractedUrls = useMemo(() => extractUrls(urls), [urls]);
  const urlsArray = useMemo(
    () => getUrlsArray(extractedUrls.text),
    [extractedUrls]
  );

  const handleErrors = (message: string) => {
    setErrorMessage(message);
    setIsEmptyList(true);
  };

  const handlePaste = useCallback(
    (e: ClipboardEvent, pasteHtml: boolean) => {
      const textarea = e.target as HTMLTextAreaElement;

      const [start, end] = [
        textarea.selectionStart || 0,
        textarea.selectionEnd || 0,
      ];
      const textAreaValue = textarea.value;

      const clipboardDataKey = pasteHtml ? 'text/html' : 'text/plain';
      let clipboardData = e.clipboardData?.getData(clipboardDataKey) || '';

      if (pasteHtml) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = clipboardData;

        const links = getLinksFromHtml(tempDiv, false);
        clipboardData = links.join('\n');
      }

      const updatedValue =
        textAreaValue.substring(0, start) +
        clipboardData +
        textAreaValue.substring(end);

      setUrls(updatedValue);

      textarea.selectionStart = start + clipboardData.length;
      textarea.selectionEnd = start + clipboardData.length;

      setIsEmptyList(!updatedValue);
    },
    [getLinksFromHtml, setUrls, setIsEmptyList]
  );

  const handleInputChange = useCallback(
    (e: { target: { value: SetStateAction<string> } }) => {
      const inputValue = String(e.target.value);

      if (inputValue) {
        resetErrorMessage();
        console.log('And here');
        setUrls(inputValue);
        setIsEmptyList(false);
      } else {
        setUrls('');
        setIsEmptyList(true);
        setSettings((prevState) => {
          return {
            ...prevState,
            [LOCAL_STORAGE_URLS_KEY]: '',
            [LOCAL_STORAGE_SORT_KEY]: 'unset',
          };
        });
        resetErrorMessage();
      }
    },
    [setUrls, setIsEmptyList, resetErrorMessage]
  );

  const handleUrlExtraction = useCallback(() => {
    setUrls(extractedUrls.text);

    if (!extractedUrls.hasValidUrls) {
      handleErrors(VALIDATION_ERROR_TEXTS.noContent);
    }

    return extractedUrls;
  }, [extractedUrls, setUrls, handleErrors]);

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
    resetErrorMessage();
  }, [handleUrlExtraction, urls, setUrls, resetErrorMessage, handleErrors]);

  const handleSort = useCallback(
    (sortDirection: SortDirection) => {
      const extractedUrls = handleUrlExtraction();

      if (!extractedUrls.hasValidUrls) {
        handleErrors(VALIDATION_ERROR_TEXTS.invalid);
      } else {
        const urlsArray = getUrlsArray(extractedUrls.text);

        if (!urlsArray.length) {
          handleErrors(VALIDATION_ERROR_TEXTS.empty);
        } else {
          const sortedUrls = sortUrls(urlsArray, sortDirection);

          setSettings((prevState) => {
            return {
              ...prevState,
              [LOCAL_STORAGE_URLS_KEY]: sortedUrls.join('\n'),
              [LOCAL_STORAGE_SORT_KEY]: sortDirection,
            };
          });

          setIsEmptyList(false);
          resetErrorMessage();
        }
      }
    },
    [handleUrlExtraction, setUrls, setIsEmptyList, resetErrorMessage]
  );

  const handleOpenAllUrls = useCallback(() => {
    const extractedUrls = handleUrlExtraction();

    if (!extractedUrls.hasValidUrls) {
      handleErrors(VALIDATION_ERROR_TEXTS.invalid);
    } else {
      if (!urlsArray.length) {
        handleErrors(VALIDATION_ERROR_TEXTS.empty);
      } else {
        void chrome.runtime.sendMessage({
          action: 'openAllUrls',
          urls: urlsArray,
          lazyLoad: settings[LOCAL_STORAGE_LAZY_LOAD_KEY] === 'on',
        });
      }
    }
  }, [urls, handleUrlExtraction, urlsArray, settings, handleErrors]);

  useModEnterKeyPress(handleOpenAllUrls);
  usePaste(handlePaste, settings[LOCAL_STORAGE_PASTE_HTML_KEY] === 'on');

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
