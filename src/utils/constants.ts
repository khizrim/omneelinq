export const EXTENSION_NAME = 'Omneelinq';

export const MAINTAINER_EMAIL = 'khizrim@khizrim.ru';

export const LOCAL_STORAGE_URLS_KEY = 'urls';

export const LOCAL_STORAGE_SWITCH_KEY = 'switch-state';

export const LOCAL_STORAGE_PASTE_HTML_KEY = 'paste-html';

export const URL_REGEX =
  /\b(?:https?|ftp):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]/gi;

export const LAZYLOAD_SWITCH_TEXTS = {
  label: 'Open One-by-One',
  helpPopover:
    'A new tab will not be created until the current tab is fully loaded.',
};

export const PASTE_HTML_SWITCH_TEXTS = {
  label: 'Paste as HTML',
  helpPopover:
    'Allows you to paste text as HTML, including all links and tags. You can easily extract all the links afterward.',
};

export const TEXTAREA_PLACEHOLDER =
  'Enter a list of links or text containing links';

export const PARSE_TAB_URLS_BUTTON = {
  label: 'Parse Tabs',
  tooltip: {
    title: 'Get All Tab Links',
    description: 'Parse links from all tabs opened in the current window',
  },
};

export const OPEN_ALL_URLS_BUTTON = {
  label: 'Open All',
  tooltip: {
    title: 'Open All Links',
    description: 'Finds the links and opens them in new tabs',
    hotkey: 'mod+enter',
  },
};

export const EXTRACT_BUTTON = {
  label: 'Links Only',
  tooltip: {
    title: 'Extract Links from Text',
    description:
      'Finds all links within the entered text, extracts them, and creates a list.',
  },
};

export const VALIDATION_ERROR_TEXTS = {
  NO_CONTENT: 'No content to extract',
  EMPTY: 'Please paste a list of links or text containing links',
  INVALID: 'No valid links found in the text',
};

export const BUG_REPORT_TEXTS = {
  subject: 'A new bug discovered in Omneelinq!',
  label: 'Report a Bug',
};
