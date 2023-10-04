import { URL_REGEX } from 'src/utils/constants';

interface ExtractedUrlsProps {
  hasValidUrls: boolean;
  text: string;
}

export const extractUrls = (text: string): ExtractedUrlsProps => {
  const matches = text.match(URL_REGEX);

  if (!matches) {
    return { hasValidUrls: false, text };
  }

  return {
    hasValidUrls: true,
    text: matches.join('\n'),
  };
};
