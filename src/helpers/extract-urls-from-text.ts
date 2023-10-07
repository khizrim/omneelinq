import { URL_REGEX } from 'src/utils/constants';

interface ExtractedUrlsProps {
  hasValidUrls: boolean;
  count?: number;
  text: string;
}

export const extractUrls = (text: string): ExtractedUrlsProps => {
  const matches = text.match(URL_REGEX);

  if (!matches) {
    return { hasValidUrls: false, text };
  }

  return {
    hasValidUrls: true,
    count: matches.length,
    text: matches.join('\n'),
  };
};
