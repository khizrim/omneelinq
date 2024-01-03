export type TooltipTextsProps = {
  title: string;
  description?: string;
  hotkey?: string;
};

export type ButtonTextsProps = {
  label: string;
  tooltip?: TooltipTextsProps;
};

export type SwitchTextsProps = {
  label: string;
  helpPopover?: string;
};

export type LocalStorageKey =
  | 'settings'
  | 'sort'
  | 'lazy'
  | 'paste-html'
  | 'urls';
