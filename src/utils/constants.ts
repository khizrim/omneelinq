export const LOCAL_STORAGE_URLS_KEY = 'urls';

export const LOCAL_STORAGE_SWITCH_KEY = 'switch-state';

export const LOCAL_STORAGE_PASTE_HTML_KEY = 'paste-html';

export const URL_REGEX =
  /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()[\]{};:'".,<>?«»“”‘’]))/gi;

export const LAZYLOAD_SWITCH_TEXTS = {
  label: 'Open Links One by One',
  helpPopover:
    'A new tab will not be created until the current tab is fully loaded.',
};

export const PASTE_HTML_SWITCH_TEXTS = {
  label: 'Paste HTML',
  helpPopover:
    'Allows to paste the text as HTML, including all the tags and links. You can simply extract all the links afterward.',
};

export const TEXTAREA_PLACEHOLDER =
  'Enter a list of links or text containing URLs';

export const OPEN_ALL_URLS_BUTTON_TOOLTIP = {
  title: 'Open all URLs',
  description: 'Finds the URLs and opens them in new tabs',
  hotkey: 'mod+enter',
};

export const EXTRACT_BUTTON_TOOLTIP = {
  title: 'Extract URLs from Text',
  description:
    'Finds all the links within the entered text, extracts them, and creates a list.',
};

export const VALIDATION_ERROR_TEXTS = {
  NO_CONTENT: 'No content to extract',
  EMPTY: 'Please paste the list of links or text containing links',
  INVALID: 'No valid URLs found in the text',
};
