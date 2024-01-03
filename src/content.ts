import { getUniqueUrlsArray } from './helpers/get-unique-urls-array';
import { getUrlsFromSelection } from './helpers/get-urls-from-selection';

chrome.runtime.onMessage.addListener((request) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (request.action === 'runLinksOpener') {
    const selection = document.getSelection();

    if (selection) {
      const links = getUrlsFromSelection(selection);

      if (links.length) {
        void chrome.runtime.sendMessage({
          action: 'openAllUrls',
          urls: getUniqueUrlsArray(links),
          lazyLoad: false,
        });
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (request.action === 'runLinksCopier') {
    const selection = document.getSelection();

    if (selection) {
      const links = getUrlsFromSelection(selection);

      if (links.length) {
        void chrome.runtime.sendMessage({
          action: 'copyUrlsToList',
          urls: getUniqueUrlsArray(links),
        });
      }
    }
  }
});
