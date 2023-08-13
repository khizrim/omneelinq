export const LOCAL_STORAGE_URLS_KEY = 'urls';

export const LOCAL_STORAGE_SWITCH_KEY = 'switch-state';

export const LOCAL_STORAGE_PASTE_HTML_KEY = 'paste-html';

export const URL_REGEX =
  /\b(?:https?|ftp):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]/gi;

export const LAZYLOAD_SWITCH_TEXTS = {
  label: 'Open one-by-one',
  helpPopover:
    'A new tab will not be created until the current tab is fully loaded.',
};

export const PASTE_HTML_SWITCH_TEXTS = {
  label: 'Paste as HTML',
  helpPopover:
    'Allows to paste the text as HTML, including all the tags and links. You can simply extract all the links afterward.',
};

export const TEXTAREA_PLACEHOLDER =
  'Enter a list of links or text containing URLs';

export const PARSE_TAB_URLS_BUTTON_TOOLTIP = {
  title: 'Get all tab URLs',
  description: 'Parses URLs from all tabs opened in the current window',
};

export const OPEN_ALL_URLS_BUTTON_TOOLTIP = {
  title: 'Open all URLs',
  description: 'Finds the URLs and opens them in new tabs',
  hotkey: 'mod+enter',
};

export const EXTRACT_BUTTON_TOOLTIP = {
  title: 'Extract URLs from text',
  description:
    'Finds all the links within the entered text, extracts them, and creates a list.',
};

export const VALIDATION_ERROR_TEXTS = {
  NO_CONTENT: 'No content to extract',
  EMPTY: 'Please paste the list of links or text containing links',
  INVALID: 'No valid URLs found in the text',
};
