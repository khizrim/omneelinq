import React, { useCallback } from 'react';

import { Switch } from 'src/components/Switch';
import { useSettingsStore } from 'src/store/store';
import {
  LOCAL_STORAGE_PASTE_HTML_KEY,
  PASTE_HTML_SWITCH_TEXTS,
} from 'src/utils/constants';

export const PasteHtmlSwitch = () => {
  const [settings, setSettings] = useSettingsStore();

  const handleToggle = useCallback(() => {
    setSettings((prevState) => {
      return {
        ...prevState,
        [LOCAL_STORAGE_PASTE_HTML_KEY]:
          settings[LOCAL_STORAGE_PASTE_HTML_KEY] === 'on' ? 'off' : 'on',
      };
    });
  }, [settings]);

  return (
    <Switch
      label={PASTE_HTML_SWITCH_TEXTS.label}
      popover={PASTE_HTML_SWITCH_TEXTS.helpPopover}
      state={settings[LOCAL_STORAGE_PASTE_HTML_KEY] === 'on'}
      onToggle={handleToggle}
    />
  );
};
