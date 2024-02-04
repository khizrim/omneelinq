import React, { useCallback } from 'react';

import { CircleInfo } from '@gravity-ui/icons';
import { Icon, Link } from '@gravity-ui/uikit';

import { useSettingsStore } from 'src/store/store';
import {
  LOCAL_STORAGE_NOTIFICATIONS_KEY,
  WHATS_NEW_BUTTON_TEXTS,
} from 'src/utils/constants';

export const WhatsNew = () => {
  const [, setSettings] = useSettingsStore();

  const handleNotificationsOpen = useCallback(() => {
    setSettings((prevState) => {
      return {
        ...prevState,
        [LOCAL_STORAGE_NOTIFICATIONS_KEY]: 'on',
      };
    });
  }, []);

  return (
    <Link
      onClick={handleNotificationsOpen}
      aria-label={WHATS_NEW_BUTTON_TEXTS.label}
    >
      <Icon data={CircleInfo} />
    </Link>
  );
};
