import React from 'react';

import { ClipboardButton, ThemeProvider } from '@gravity-ui/uikit';
import {
  ArrowDownFromLine,
  ArrowUpRightFromSquare,
  BroomMotion,
} from '@gravity-ui/icons';

import TopBar from '../TopBar';
import Input from '../Input';
import Button from '../Button';
import Options from '../Options';

import {
  EXTRACT_BUTTON_TOOLTIP,
  LOCAL_STORAGE_PASTE_HTML_KEY,
  LOCAL_STORAGE_SWITCH_KEY,
  LOCAL_STORAGE_URLS_KEY,
  OPEN_ALL_URLS_BUTTON_TOOLTIP,
  PARSE_TAB_URLS_BUTTON_TOOLTIP,
  VALIDATION_ERROR_TEXTS,
} from '../../utils/constants';

import styles from './App.module.css';

import { extractUrls } from '../../helpers/extract-urls-from-text';
import { useModEnterKeyPress } from '../../hooks/useModEnterKeyPress';
import { usePaste } from '../../hooks/usePaste';
import { parseTabUrls } from '../../helpers/parse-tab-urls';

export const App = () => {
  const [urls, setUrls] = React.useState<string>(
    localStorage.getItem(LOCAL_STORAGE_URLS_KEY) || ''
  );

  const [lazyLoad, setLazyLoad] = React.useState<boolean>(
    localStorage.getItem(LOCAL_STORAGE_SWITCH_KEY) === 'on'
  );

  const [pasteHtml, setPasteHtml] = React.useState<boolean>(
    localStorage.getItem(LOCAL_STORAGE_PASTE_HTML_KEY) === 'on'
  );

  const [isButtonDisabled, setIsButtonDisabled] =
    React.useState<boolean>(false);

  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const handlePaste = React.useCallback(
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

  const handlePasteChange = React.useCallback(() => {
    setPasteHtml((prev) => !prev);
    localStorage.setItem(
      LOCAL_STORAGE_PASTE_HTML_KEY,
      !pasteHtml ? 'on' : 'off'
    );
  }, [pasteHtml]);

  const handleInputChange = React.useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      const inputValue = String(e.target.value);

      setErrorMessage('');
      setUrls(inputValue);
      localStorage.setItem(LOCAL_STORAGE_URLS_KEY, inputValue);
    },
    []
  );

  const handleSwitch = React.useCallback(() => {
    setLazyLoad((prev) => !prev);
    localStorage.setItem(LOCAL_STORAGE_SWITCH_KEY, !lazyLoad ? 'on' : 'off');
  }, [lazyLoad]);

  const handleUrlExtraction = React.useCallback(() => {
    const extractedUrls = extractUrls(urls);

    setUrls(extractedUrls.text);

    localStorage.setItem(LOCAL_STORAGE_URLS_KEY, extractedUrls.text);

    if (!extractedUrls.hasValidUrls) {
      setErrorMessage(VALIDATION_ERROR_TEXTS.NO_CONTENT);
    }

    return extractedUrls;
  }, [urls]);

  const handleTabsParsing = React.useCallback(async () => {
    try {
      const currentTabs = await parseTabUrls();
      setUrls(currentTabs.join('\n'));
    } catch (error) {
      console.error('Error parsing tab URLs:', error);
    }
  }, []);

  const getUrlsArray = (text: string) =>
    text.split('\n').filter((url) => url.trim() !== '');

  const handleOpenAllUrls = React.useCallback(() => {
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
            onToggle={handleSwitch}
            pasteHtml={pasteHtml}
            onToggle1={handlePasteChange}
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
                text={'Parse Tabs'}
                onClick={() => void handleTabsParsing()}
                tooltip={PARSE_TAB_URLS_BUTTON_TOOLTIP}
              />
              <div className={styles.cta}>
                <ClipboardButton text={urls} size={18} />
                <Button
                  size={'m'}
                  icon={BroomMotion}
                  text={'URLs Only'}
                  disabled={isButtonDisabled}
                  onClick={handleUrlExtraction}
                  tooltip={EXTRACT_BUTTON_TOOLTIP}
                />
                <Button
                  size={'m'}
                  icon={ArrowUpRightFromSquare}
                  view={'action'}
                  text={'Open All'}
                  disabled={isButtonDisabled}
                  onClick={handleOpenAllUrls}
                  tooltip={OPEN_ALL_URLS_BUTTON_TOOLTIP}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </ThemeProvider>
  );
};
