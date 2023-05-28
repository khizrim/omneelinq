import React from 'react';
import { ThemeProvider } from '@gravity-ui/uikit';

import TopBar from '../TopBar';
import Input from '../Input';
import Button from '../Button';

import {
  LOCAL_STORAGE_SWITCH_KEY,
  LOCAL_STORAGE_URLS_KEY,
} from '../../utils/constants';

import styles from './App.module.css';

import { extractUrls } from '../../helpers/extract-urls-from-text';

export const App = () => {
  const [urls, setUrls] = React.useState<string>(
    localStorage.getItem(LOCAL_STORAGE_URLS_KEY) || ''
  );

  const [lazyLoad, setLazyLoad] = React.useState<boolean>(
    localStorage.getItem(LOCAL_STORAGE_SWITCH_KEY) === 'on'
  );

  const handleInputChange = React.useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      const inputValue = String(e.target.value);

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
    setUrls((prev) => extractUrls(prev));
  }, []);

  const handleOpenAllUrls = React.useCallback(() => {
    const urlsArray = urls.split('\n').filter((url) => url.trim() !== '');

    void chrome.runtime.sendMessage({
      action: 'openAllUrls',
      urls: urlsArray,
      lazyLoad,
    });
  }, [urls, lazyLoad]);

  return (
    <ThemeProvider>
      <div className={styles.app}>
        <div className={styles.container}>
          <TopBar lazyLoad={lazyLoad} onToggle={handleSwitch} />
          <Input value={urls} onChange={handleInputChange} />
          <div className={styles.buttons}>
            <Button text={'Open All URLs'} onClick={handleOpenAllUrls} />
            <Button text={'Extract URLs'} onClick={handleUrlExtraction} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};
