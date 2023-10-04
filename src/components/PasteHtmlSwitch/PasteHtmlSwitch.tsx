import React from 'react';

import { PASTE_HTML_SWITCH_TEXTS } from '../../utils/constants';
import { Switch, SwitchProps } from '../Switch';

export type PasteHtmlSwitchProps = {
  pasteHtml: boolean;
} & Pick<SwitchProps, 'onToggle'>;

export const PasteHtmlSwitch = ({
  pasteHtml,
  onToggle,
}: PasteHtmlSwitchProps) => {
  return (
    <Switch
      label={PASTE_HTML_SWITCH_TEXTS.label}
      popover={PASTE_HTML_SWITCH_TEXTS.helpPopover}
      state={pasteHtml}
      onToggle={onToggle}
    />
  );
};
