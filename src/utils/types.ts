export type Button = {
  label: string;
  tooltip?: {
    title: string;
    description?: string;
    hotkey?: string;
  };
};

export type Switch = {
  label: string;
  helpPopover?: string;
};

export type LocalStorageKey = 'sort' | 'switch-state' | 'paste-html' | 'urls';
