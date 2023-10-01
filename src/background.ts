import { openAllUrls } from './helpers/open-all-urls';

chrome.runtime.onMessage.addListener(
  (message: { action: string; urls: string[]; lazyLoad: boolean }) => {
    if (message.action === 'openAllUrls') {
      void openAllUrls(message.urls, message.lazyLoad);
    }
  }
);
