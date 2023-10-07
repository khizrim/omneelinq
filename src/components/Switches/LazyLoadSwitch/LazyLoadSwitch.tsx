import React, { useCallback, useState } from 'react';

import { Switch } from 'src/components/Switch';
import {
  LAZY_LOAD_SWITCH_TEXTS,
  LOCAL_STORAGE_LAZY_LOAD_KEY,
} from 'src/utils/constants';

export const LazyLoadSwitch = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(
    localStorage.getItem(LOCAL_STORAGE_LAZY_LOAD_KEY) === 'on'
  );

  const handleToggle = useCallback(() => {
    setIsEnabled((prev) => !prev);
    localStorage.setItem(
      LOCAL_STORAGE_LAZY_LOAD_KEY,
      !isEnabled ? 'on' : 'off'
    );
  }, [isEnabled]);

  return (
    <Switch
      label={LAZY_LOAD_SWITCH_TEXTS.label}
      popover={LAZY_LOAD_SWITCH_TEXTS.helpPopover}
      state={isEnabled}
      onToggle={handleToggle}
    />
  );
};
