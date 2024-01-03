import { getMessage } from 'src/helpers/get-message';
import { getVersion } from 'src/helpers/get-version';

import type {
  ButtonTextsProps,
  LocalStorageKey,
  SwitchTextsProps,
} from './types';

export const EXTENSION_NAME = getMessage('extName');

export const EXTENSION_VERSION = getVersion();

export const MAINTAINER_EMAIL = 'khizrim@khizrim.ru';

export const LOCAL_STORAGE_SETTINGS_KEY: LocalStorageKey = 'settings';

export const LOCAL_STORAGE_URLS_KEY: LocalStorageKey = 'urls';

export const LOCAL_STORAGE_SORT_KEY: LocalStorageKey = 'sort';

export const LOCAL_STORAGE_LAZY_LOAD_KEY: LocalStorageKey = 'lazy';

export const LOCAL_STORAGE_PASTE_HTML_KEY: LocalStorageKey = 'paste-html';

export const URL_REGEX =
  /\b(?:https?|ftp):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]/gi;

export const LAZY_LOAD_SWITCH_TEXTS: SwitchTextsProps = {
  label: getMessage('labelLazyLoadSwitch'),
  helpPopover: getMessage('helpPopoverLazyLoadSwitch'),
};

export const PASTE_HTML_SWITCH_TEXTS: SwitchTextsProps = {
  label: getMessage('labelPasteHtmlSwitch'),
  helpPopover: getMessage('helpPopoverPasteHtmlSwitch'),
};

export const TEXTAREA_PLACEHOLDER = getMessage('placeholderTextarea');

export const REMOVE_DUPLICATES_BUTTON: ButtonTextsProps = {
  label: getMessage('labelRemoveDuplicatesButton'),
};

export const LIST_TABS_URLS_BUTTON: ButtonTextsProps = {
  label: getMessage('labelListTabsButton'),
  tooltip: {
    title: getMessage('tooltipTitleListTabsButton'),
    description: getMessage('tooltipDescriptionListTabsButton'),
  },
};

export const OPEN_ALL_URLS_BUTTON: ButtonTextsProps = {
  label: getMessage('labelOpenAllButton'),
  tooltip: {
    title: getMessage('tooltipTitleOpenAllButton'),
    description: getMessage('tooltipDescriptionOpenAllButton'),
    hotkey: 'mod+enter',
  },
};

export const EXTRACT_BUTTON: ButtonTextsProps = {
  label: getMessage('labelLinksOnlyButton'),
  tooltip: {
    title: getMessage('tooltipTitleLinksOnlyButton'),
    description: getMessage('tooltipDescriptionLinksOnlyButton'),
  },
};

export const VALIDATION_ERROR_TEXTS = {
  noContent: getMessage('errorNoContentToExtract'),
  empty: getMessage('errorEmptyInput'),
  invalid: getMessage('errorNoValidLinksFound'),
};

export const BUG_REPORT_TEXTS = {
  subject: getMessage('subjectBugReport'),
  label: getMessage('labelReportBugButton'),
};

export const LINKS_COUNT_TEXT = getMessage('linksCountText');
