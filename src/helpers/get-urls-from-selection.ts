import { getLinksFromHtml } from './get-links-from-html';

export const getUrlsFromSelection = (selection: Selection) => {
  if (selection.rangeCount === 0) {
    return [];
  }

  const range = selection.getRangeAt(0);
  const fragment = range.cloneContents();
  const tempDiv = document.createElement('div');
  tempDiv.appendChild(fragment);

  return getLinksFromHtml(tempDiv, true);
};
