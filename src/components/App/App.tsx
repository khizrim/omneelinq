import React from 'react';
import { ClipboardButton, ThemeProvider } from '@gravity-ui/uikit';
import { ArrowUpRightFromSquare } from '@gravity-ui/icons';

import TopBar from '../TopBar';
import Input from '../Input';
import Button from '../Button';

import {
  EXTRACT_BUTTON_TOOLTIP,
  LOCAL_STORAGE_SWITCH_KEY,
  LOCAL_STORAGE_URLS_KEY,
  OPEN_ALL_URLS_BUTTON_TOOLTIP,
  VALIDATION_ERROR_TEXTS,
} from '../../utils/constants';

import styles from './App.module.css';

import { extractUrls } from '../../helpers/extract-urls-from-text';
import { useModEnterKeyPress } from '../../hooks/useModEnterKeyPress';
import LazyLoadSwitch from '../LazyLoadSwitch';

export const App = () => {
  const [urls, setUrls] = React.useState<string>(
    localStorage.getItem(LOCAL_STORAGE_URLS_KEY) || ''
  );

  const [lazyLoad, setLazyLoad] = React.useState<boolean>(
    localStorage.getItem(LOCAL_STORAGE_SWITCH_KEY) === 'on'
  );

  const [isButtonDisabled, setIsButtonDisabled] =
    React.useState<boolean>(false);

  const [errorMessage, setErrorMessage] = React.useState<string>('');

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

  return (
    <ThemeProvider>
      <div className={styles.app}>
        <div className={styles.container}>
          <TopBar />
          <Input
            value={urls}
            onChange={handleInputChange}
            errorMessage={errorMessage}
          />
          <div className={styles.buttons}>
            <LazyLoadSwitch lazyLoad={lazyLoad} onToggle={handleSwitch} />
            <ClipboardButton text={urls} size={18} />
            <Button
              text={'Extract'}
              disabled={isButtonDisabled}
              onClick={handleUrlExtraction}
              tooltip={EXTRACT_BUTTON_TOOLTIP}
            />
            <Button
              icon={ArrowUpRightFromSquare}
              text={'Open All'}
              disabled={isButtonDisabled}
              onClick={handleOpenAllUrls}
              tooltip={OPEN_ALL_URLS_BUTTON_TOOLTIP}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};
