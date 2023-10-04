import React from 'react';

import { Switch, SwitchProps } from 'src/components/Switch';
import { LAZYLOAD_SWITCH_TEXTS } from 'src/utils/constants';

export type LazyLoadSwitchProps = {
  lazyLoad: boolean;
} & Pick<SwitchProps, 'onToggle'>;

export const LazyLoadSwitch = ({ lazyLoad, onToggle }: LazyLoadSwitchProps) => {
  return (
    <Switch
      label={LAZYLOAD_SWITCH_TEXTS.label}
      popover={LAZYLOAD_SWITCH_TEXTS.helpPopover}
      state={lazyLoad}
      onToggle={onToggle}
    />
  );
};
