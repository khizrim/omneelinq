import React from 'react';

import { Switch, SwitchProps } from 'src/components/Switch';
import { PASTE_HTML_SWITCH_TEXTS } from 'src/utils/constants';

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
