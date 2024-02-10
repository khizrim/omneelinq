import type { SetStateAction } from 'react';
import React, { useCallback, useMemo } from 'react';

import { Alert, Flex, spacing, ThemeProvider } from '@gravity-ui/uikit';

import type { SortDirection } from 'src/components';
import { Form, TopBar } from 'src/components';

import { extractUrls } from 'src/helpers/extract-urls-from-text';
import { getUniqueUrlsArray } from 'src/helpers/get-unique-urls-array';
import { getUrlsArray } from 'src/helpers/get-urls-array';
import { parseTabUrls } from 'src/helpers/parse-tab-urls';
import { sortUrls } from 'src/helpers/sort-urls';
import { useErrorMessage } from 'src/hooks/useErrorMessage';
import { useModEnterKeyPress } from 'src/hooks/useModEnterKeyPress';
import { useUrls } from 'src/hooks/useUrls';
import { useSettingsStore } from 'src/store/store';
import {
  LOCAL_STORAGE_LAZY_LOAD_KEY,
  LOCAL_STORAGE_NOTIFICATIONS_KEY,
  LOCAL_STORAGE_SORT_KEY,
  LOCAL_STORAGE_URLS_KEY,
  UPDATE_NOTIFICATION_TEXTS,
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

  const handleInputChange = useCallback(
    (e: { target: { value: SetStateAction<string> } }) => {
      setUrls(String(e.target.value));
    },
    [setUrls]
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

  const handleNotificationsClose = useCallback(() => {
    setSettings((prevState) => {
      return {
        ...prevState,
        [LOCAL_STORAGE_NOTIFICATIONS_KEY]: 'off',
      };
    });
  }, []);

  useModEnterKeyPress(handleOpenAllUrls);

  return (
    <ThemeProvider>
      <Flex
        className={spacing({ pt: 8, px: 8, pb: 10 })}
        direction={'column'}
        width={720}
        gap={2}
      >
        <TopBar />
        {settings[LOCAL_STORAGE_NOTIFICATIONS_KEY] === 'on' && (
          <Alert
            theme="info"
            title={UPDATE_NOTIFICATION_TEXTS.title}
            message={UPDATE_NOTIFICATION_TEXTS.message}
            onClose={handleNotificationsClose}
          />
        )}
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
