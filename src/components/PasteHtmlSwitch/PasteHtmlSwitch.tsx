import React from 'react';

import { PASTE_HTML_SWITCH_TEXTS } from '../../utils/constants';
import Switch from '../Switch';

export type LazyLoadSwitchProps = {
  pasteHtml: boolean;
  onToggle: (checked: boolean) => void;
};

export const PasteHtmlSwitch = ({
  pasteHtml,
  onToggle,
}: LazyLoadSwitchProps) => {
  return (
    <Switch
      label={PASTE_HTML_SWITCH_TEXTS.label}
      popover={PASTE_HTML_SWITCH_TEXTS.helpPopover}
      state={pasteHtml}
      onToggle={onToggle}
    />
  );
};
