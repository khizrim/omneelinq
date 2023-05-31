export const LOCAL_STORAGE_URLS_KEY = 'urls';

export const LOCAL_STORAGE_SWITCH_KEY = 'switch-state';

export const URL_REGEX =
  /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()[\]{};:'".,<>?«»“”‘’]))/gi;

export const LAZYLOAD_SWITCH_TEXTS = {
  label: 'Open links one-by-one',
  helpPopover:
    'The new tab will not be created until the current tab is fully loaded.',
};

export const TEXTAREA_PLACEHOLDER =
  'Type in or paste a list of links, or paste text containing URLs and click the ’Extract URLs’ button.';
