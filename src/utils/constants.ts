export const LOCAL_STORAGE_URLS_KEY = 'urls';

export const LOCAL_STORAGE_SWITCH_KEY = 'switch-state';

export const URL_REGEX =
  /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()[\]{};:'".,<>?«»“”‘’]))/gi;

export const LAZYLOAD_SWITCH_TEXTS = {
  label: 'Open links one-by-one',
  helpPopover:
    'A new tab will not be created until the current tab is fully loaded.',
};

export const TEXTAREA_PLACEHOLDER = 'Enter a list of links or text containing URLs';

export const OPEN_ALL_URLS_BUTTON_TOOLTIP = {
  title: 'Open all URLs',
  description: 'Finds the URLs and opens them in new tabs',
  hotkey: 'mod+enter',
};

export const EXTRACT_BUTTON_TOOLTIP = {
  title: 'Extract URLs from Text',
};

export const VALIDATION_ERROR_TEXTS = {
  NO_CONTENT: 'No content to extract',
  EMPTY: 'Please paste the list of links or text containing links',
  INVALID: 'No valid URLs found in the text',
};
