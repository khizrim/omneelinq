import type { Button, LocalStorageKey, Switch } from './types';

export const EXTENSION_NAME = chrome.i18n.getMessage('extName');

export const MAINTAINER_EMAIL = 'khizrim@khizrim.ru';

export const LOCAL_STORAGE_URLS_KEY: LocalStorageKey = 'urls';

export const LOCAL_STORAGE_SORT_KEY: LocalStorageKey = 'sort';

export const LOCAL_STORAGE_SWITCH_KEY: LocalStorageKey = 'switch-state';

export const LOCAL_STORAGE_PASTE_HTML_KEY: LocalStorageKey = 'paste-html';

export const URL_REGEX =
  /\b(?:https?|ftp):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]/gi;

export const LAZYLOAD_SWITCH_TEXTS: Switch = {
  label: chrome.i18n.getMessage('labelLazyloadSwitch'),
  helpPopover: chrome.i18n.getMessage('helpPopoverLazyloadSwitch'),
};

export const PASTE_HTML_SWITCH_TEXTS: Switch = {
  label: chrome.i18n.getMessage('labelPasteHtmlSwitch'),
  helpPopover: chrome.i18n.getMessage('helpPopoverPasteHtmlSwitch'),
};

export const TEXTAREA_PLACEHOLDER = chrome.i18n.getMessage(
  'placeholderTextarea'
);

export const REMOVE_DUPLICATES_BUTTON: Button = {
  label: chrome.i18n.getMessage('labelRemoveDuplicatesButton'),
};

export const PARSE_TAB_URLS_BUTTON: Button = {
  label: chrome.i18n.getMessage('labelParseTabsButton'),
  tooltip: {
    title: chrome.i18n.getMessage('tooltipTitleParseTabsButton'),
    description: chrome.i18n.getMessage('tooltipDescriptionParseTabsButton'),
  },
};

export const OPEN_ALL_URLS_BUTTON: Button = {
  label: chrome.i18n.getMessage('labelOpenAllButton'),
  tooltip: {
    title: chrome.i18n.getMessage('tooltipTitleOpenAllButton'),
    description: chrome.i18n.getMessage('tooltipDescriptionOpenAllButton'),
    hotkey: 'mod+enter',
  },
};

export const EXTRACT_BUTTON: Button = {
  label: chrome.i18n.getMessage('labelLinksOnlyButton'),
  tooltip: {
    title: chrome.i18n.getMessage('tooltipTitleLinksOnlyButton'),
    description: chrome.i18n.getMessage('tooltipDescriptionLinksOnlyButton'),
  },
};

export const VALIDATION_ERROR_TEXTS = {
  noContent: chrome.i18n.getMessage('errorNoContentToExtract'),
  empty: chrome.i18n.getMessage('errorEmptyInput'),
  invalid: chrome.i18n.getMessage('errorNoValidLinksFound'),
};

export const BUG_REPORT_TEXTS = {
  subject: chrome.i18n.getMessage('subjectBugReport'),
  label: chrome.i18n.getMessage('labelReportBugButton'),
};
