export const getLinksFromHtml = (
  html: HTMLElement,
  getRelativeLinks: boolean
): string[] => {
  const origin = window.location.origin;

  return Array.from(html.querySelectorAll('a'))
    .map((anchor) => {
      const href = anchor.getAttribute('href');

      if (href && href.startsWith('http')) {
        return href;
      } else if (getRelativeLinks && href && href.startsWith('/')) {
        return origin + href;
      }

      return '';
    })
    .filter((href) => href !== null);
};
