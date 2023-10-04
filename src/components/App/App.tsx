import React, { SetStateAction, useCallback, useState } from 'react';

import {
  ArrowDownFromLine,
  ArrowUpRightFromSquare,
  BroomMotion,
} from '@gravity-ui/icons';
import { ClipboardButton, ThemeProvider } from '@gravity-ui/uikit';

import { Button, Input, Options, TopBar } from 'src/components';

import { extractUrls } from 'src/helpers/extract-urls-from-text';
import { parseTabUrls } from 'src/helpers/parse-tab-urls';
import { useModEnterKeyPress } from 'src/hooks/useModEnterKeyPress';
import { usePaste } from 'src/hooks/usePaste';
import {
  EXTRACT_BUTTON,
  LOCAL_STORAGE_PASTE_HTML_KEY,
  LOCAL_STORAGE_SWITCH_KEY,
  LOCAL_STORAGE_URLS_KEY,
  OPEN_ALL_URLS_BUTTON,
  PARSE_TAB_URLS_BUTTON,
  VALIDATION_ERROR_TEXTS,
} from 'src/utils/constants';

import styles from './App.module.css';

export const App = () => {
  const [urls, setUrls] = useState<string>(
    localStorage.getItem(LOCAL_STORAGE_URLS_KEY) || ''
  );

  const [lazyLoad, setLazyLoad] = useState<boolean>(
    localStorage.getItem(LOCAL_STORAGE_SWITCH_KEY) === 'on'
  );

  const [pasteHtml, setPasteHtml] = useState<boolean>(
    localStorage.getItem(LOCAL_STORAGE_PASTE_HTML_KEY) === 'on'
  );

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const handlePaste = useCallback(
    (e: ClipboardEvent) => {
      e.preventDefault();

      if (pasteHtml) {
        const html = e.clipboardData?.getData('text/html') || '';
        setUrls((prev) => prev + html);
      } else {
        const plain = e.clipboardData?.getData('text/plain') || '';
        setUrls((prev) => prev + plain);
      }
    },
    [pasteHtml]
  );

  const handlePasteChange = useCallback(() => {
    setPasteHtml((prev) => !prev);
    localStorage.setItem(
      LOCAL_STORAGE_PASTE_HTML_KEY,
      !pasteHtml ? 'on' : 'off'
    );
  }, [pasteHtml]);

  const handleInputChange = useCallback(
    (e: { target: { value: SetStateAction<string> } }) => {
      const inputValue = String(e.target.value);

      setErrorMessage('');
      setUrls(inputValue);
      localStorage.setItem(LOCAL_STORAGE_URLS_KEY, inputValue);
    },
    []
  );

  const handleSwitch = useCallback(() => {
    setLazyLoad((prev) => !prev);
    localStorage.setItem(LOCAL_STORAGE_SWITCH_KEY, !lazyLoad ? 'on' : 'off');
  }, [lazyLoad]);

  const handleUrlExtraction = useCallback(() => {
    const extractedUrls = extractUrls(urls);

    setUrls(extractedUrls.text);

    localStorage.setItem(LOCAL_STORAGE_URLS_KEY, extractedUrls.text);

    if (!extractedUrls.hasValidUrls) {
      setErrorMessage(VALIDATION_ERROR_TEXTS.NO_CONTENT);
    }

    return extractedUrls;
  }, [urls]);

  const handleTabsParsing = useCallback(async () => {
    try {
      const currentTabs = await parseTabUrls();
      setUrls(currentTabs.join('\n'));
    } catch (error) {
      console.error('Error parsing tab URLs:', error);
    }
  }, []);

  const handleRemoveDuplicates = useCallback(() => {
    const extractedUrls = handleUrlExtraction();

    if (!extractedUrls.hasValidUrls) {
      setErrorMessage(VALIDATION_ERROR_TEXTS.EMPTY);
    } else {
      const urlsArray = getUrlsArray(extractedUrls.text);

      if (!urlsArray.length) {
        setIsButtonDisabled(false);
        setErrorMessage(VALIDATION_ERROR_TEXTS.INVALID);
      } else {
        const uniqueUrls = Array.from(new Set(urlsArray));

        setUrls(uniqueUrls.join('\n'));
        localStorage.setItem(LOCAL_STORAGE_URLS_KEY, uniqueUrls.join('\n'));

        setErrorMessage('');
      }
    }
  }, [handleUrlExtraction, urls]);

  const getUrlsArray = (text: string) =>
    text.split('\n').filter((url) => url.trim() !== '');

  const handleOpenAllUrls = useCallback(() => {
    const extractedUrls = handleUrlExtraction();

    if (!extractedUrls.hasValidUrls) {
      setErrorMessage(VALIDATION_ERROR_TEXTS.EMPTY);
    } else {
      const urlsArray = getUrlsArray(extractedUrls.text);

      if (!urlsArray.length) {
        setIsButtonDisabled(false);
        setErrorMessage(VALIDATION_ERROR_TEXTS.INVALID);
      } else {
        void chrome.runtime.sendMessage({
          action: 'openAllUrls',
          urls: urlsArray,
          lazyLoad,
        });
      }
    }
  }, [handleUrlExtraction, urls, lazyLoad, setErrorMessage]);

  useModEnterKeyPress(handleOpenAllUrls);
  usePaste(handlePaste);

  return (
    <ThemeProvider>
      <div className={styles.app}>
        <div className={styles.container}>
          <TopBar />
          <Options
            lazyLoad={lazyLoad}
            pasteHtml={pasteHtml}
            onLazyLoad={handleSwitch}
            onPasteHtml={handlePasteChange}
            onRemoveDuplicates={handleRemoveDuplicates}
          />
          <section className={styles.form}>
            <Input
              value={urls}
              onChange={handleInputChange}
              errorMessage={errorMessage}
            />
            <div className={styles.buttons}>
              <Button
                size={'m'}
                icon={ArrowDownFromLine}
                onClick={() => void handleTabsParsing()}
                text={PARSE_TAB_URLS_BUTTON.label}
                tooltip={PARSE_TAB_URLS_BUTTON.tooltip}
              />
              <div className={styles.cta}>
                <ClipboardButton text={urls} size={18} />
                <Button
                  size={'m'}
                  icon={BroomMotion}
                  disabled={isButtonDisabled}
                  onClick={handleUrlExtraction}
                  text={EXTRACT_BUTTON.label}
                  tooltip={EXTRACT_BUTTON.tooltip}
                />
                <Button
                  size={'m'}
                  icon={ArrowUpRightFromSquare}
                  view={'action'}
                  disabled={isButtonDisabled}
                  onClick={handleOpenAllUrls}
                  text={OPEN_ALL_URLS_BUTTON.label}
                  tooltip={OPEN_ALL_URLS_BUTTON.tooltip}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </ThemeProvider>
  );
};
