import { openAllUrls } from './helpers/open-all-urls';

chrome.runtime.onMessage.addListener(
  (message: { action: string; urls: string[]; lazyLoad: boolean }) => {
    if (message.action === 'openAllUrls') {
      openAllUrls(message.urls, message.lazyLoad)
        .then(() => {
          console.log('loaded');
        })
        .catch((err) => console.error(err));
    }
  }
);
