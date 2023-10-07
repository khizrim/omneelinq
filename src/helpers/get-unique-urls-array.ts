export const getUniqueUrlsArray = (urlsArray: string[]) =>
  Array.from(new Set(urlsArray.map((url) => url.replace(/\/$/, ''))));
