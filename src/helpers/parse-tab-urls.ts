export const parseTabUrls = async () => {
  const tabUrls: string[] = [];

  const tabs: chrome.tabs.Tab[] = await chrome.tabs.query({
    currentWindow: true,
  });

  tabs.forEach((tab) => {
    if (tab.url) {
      tabUrls.push(tab.url);
    }
  });

  return tabUrls;
};
