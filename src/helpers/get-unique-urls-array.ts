export const getUniqueUrlsArray = (urlsArray: (string | null)[]) =>
  Array.from(new Set(urlsArray.map((url) => url?.replace(/\/$/, ''))));
