export const getUrlsArray = (text: string) =>
  text.split('\n').filter((url) => url.trim() !== '');
