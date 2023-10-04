import React from 'react';

import type { SwitchProps } from 'src/components/Switch';
import { Switch } from 'src/components/Switch';
import { PASTE_HTML_SWITCH_TEXTS } from 'src/utils/constants';

export type PasteHtmlSwitchProps = {
  pasteHtml: boolean;
  onPasteHtml: SwitchProps['onToggle'];
};

export const PasteHtmlSwitch = ({
  pasteHtml,
  onPasteHtml,
}: PasteHtmlSwitchProps) => {
  return (
    <Switch
      label={PASTE_HTML_SWITCH_TEXTS.label}
      popover={PASTE_HTML_SWITCH_TEXTS.helpPopover}
      state={pasteHtml}
      onToggle={onPasteHtml}
    />
  );
};
