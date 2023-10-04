import React from 'react';

import type { SwitchProps } from 'src/components/Switch';
import { Switch } from 'src/components/Switch';
import { LAZYLOAD_SWITCH_TEXTS } from 'src/utils/constants';

export type LazyLoadSwitchProps = {
  lazyLoad: boolean;
  onLazyLoad: SwitchProps['onToggle'];
};

export const LazyLoadSwitch = ({
  lazyLoad,
  onLazyLoad,
}: LazyLoadSwitchProps) => {
  return (
    <Switch
      label={LAZYLOAD_SWITCH_TEXTS.label}
      popover={LAZYLOAD_SWITCH_TEXTS.helpPopover}
      state={lazyLoad}
      onToggle={onLazyLoad}
    />
  );
};
