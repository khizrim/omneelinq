type ExtractedUrlsProps = {
  hasValidUrls: boolean;
  text: string;
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const extractUrls = (html: string): ExtractedUrlsProps => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const anchors = Array.from(doc.querySelectorAll('a[href]'));

  const validUrls = anchors
    .map((anchor) => anchor.getAttribute('href'))
    .filter((url) => url && isValidUrl(url));

  return {
    hasValidUrls: validUrls.length > 0,
    text: validUrls.join('\n'),
  };
};
