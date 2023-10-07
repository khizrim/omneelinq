import React, { useCallback, useState } from 'react';

import { Switch } from 'src/components/Switch';
import { getLocalstorageItem } from 'src/helpers/get-localstorage-item';
import { setLocalstorageItem } from 'src/helpers/set-localstorage-item';
import {
  LOCAL_STORAGE_PASTE_HTML_KEY,
  PASTE_HTML_SWITCH_TEXTS,
} from 'src/utils/constants';

export const PasteHtmlSwitch = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(
    getLocalstorageItem(LOCAL_STORAGE_PASTE_HTML_KEY) === 'on'
  );

  const handleToggle = useCallback(() => {
    setIsEnabled((prev) => !prev);
    setLocalstorageItem(
      LOCAL_STORAGE_PASTE_HTML_KEY,
      !isEnabled ? 'on' : 'off'
    );
  }, [isEnabled]);

  return (
    <Switch
      label={PASTE_HTML_SWITCH_TEXTS.label}
      popover={PASTE_HTML_SWITCH_TEXTS.helpPopover}
      state={isEnabled}
      onToggle={handleToggle}
    />
  );
};
