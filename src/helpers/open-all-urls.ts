export const openAllUrls = async (urls: string[], lazyload: boolean) => {
  if (urls.length === 0) {
    throw new Error('No URLs to open');
  }

  let currentTab = 0;

  const onTabLoad = async (
    tabId: number,
    changeInfo: chrome.tabs.TabChangeInfo
  ) => {
    console.log(tabId, changeInfo.status);

    if (changeInfo.status === 'complete') {
      currentTab++;

      if (currentTab === urls.length) {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        chrome.tabs.onUpdated.removeListener(onTabLoad);
        return;
      } else {
        const url = urls[currentTab];

        await chrome.tabs.create({ url, active: false });
      }
    }
  };

  if (lazyload) {
    const url = urls[0];
    await chrome.tabs.create({ url, active: false });

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    chrome.tabs.onUpdated.addListener(onTabLoad);
  } else {
    for (const url of urls) {
      await chrome.tabs.create({ url, active: false });
    }
  }
};
