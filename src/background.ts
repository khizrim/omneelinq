import { copyUrlsToList } from './helpers/copy-urls-to-list';
import { openAllUrls } from './helpers/open-all-urls';

function createContextMenu() {
  chrome.contextMenus.create({
    id: 'openAllLinksFromSelection',
    title: 'Open All Links',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'copyLinksToList',
    title: 'Copy Links to List',
    contexts: ['selection'],
  });
}

chrome.runtime.onInstalled.addListener(() => {
  createContextMenu();
});

chrome.runtime.onMessage.addListener(
  (message: { action: string; urls: string[]; lazyLoad: boolean }) => {
    if (message.action === 'openAllUrls') {
      void openAllUrls(message.urls, message.lazyLoad);
    }

    if (message.action === 'copyUrlsToList') {
      void copyUrlsToList(message.urls);
    }
  }
);

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'openAllLinksFromSelection') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    void chrome.tabs.sendMessage(tab.id, { action: 'runLinksOpener' });
  }

  if (info.menuItemId === 'copyLinksToList') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    void chrome.tabs.sendMessage(tab.id, { action: 'runLinksCopier' });
  }
});
