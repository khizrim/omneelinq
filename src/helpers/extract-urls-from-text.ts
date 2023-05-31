import { URL_REGEX } from '../utils/constants';

type ExtractedUrlsProps = {
  hasValidUrls: boolean;
  text: string;
};
export const extractUrls = (text: string): ExtractedUrlsProps => {
  const matches = text.match(URL_REGEX);

  const result = { hasValidUrls: false, text: text };

  if (!matches) {
    return result;
  }

  result.hasValidUrls = true;
  result.text = matches.join('\n');

  return result;
};
