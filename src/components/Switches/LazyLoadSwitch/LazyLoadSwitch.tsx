import React, { useCallback } from 'react';

import { Switch } from 'src/components/Switch';
import { useSettingsStore } from 'src/store/store';
import {
  LAZY_LOAD_SWITCH_TEXTS,
  LOCAL_STORAGE_LAZY_LOAD_KEY,
} from 'src/utils/constants';

export const LazyLoadSwitch = () => {
  const [settings, setSettings] = useSettingsStore();

  const handleToggle = useCallback(() => {
    setSettings((prevState) => {
      return {
        ...prevState,
        [LOCAL_STORAGE_LAZY_LOAD_KEY]:
          settings[LOCAL_STORAGE_LAZY_LOAD_KEY] === 'on' ? 'off' : 'on',
      };
    });
  }, [settings]);

  return (
    <Switch
      label={LAZY_LOAD_SWITCH_TEXTS.label}
      popover={LAZY_LOAD_SWITCH_TEXTS.helpPopover}
      state={settings[LOCAL_STORAGE_LAZY_LOAD_KEY] === 'on'}
      onToggle={handleToggle}
    />
  );
};
