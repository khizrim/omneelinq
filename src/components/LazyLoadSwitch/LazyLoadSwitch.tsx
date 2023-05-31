import React from 'react';
import Switch from '../Switch';

import { LAZYLOAD_SWITCH_TEXTS } from '../../utils/constants';

export type LazyLoadSwitchProps = {
  lazyLoad: boolean;
  onToggle: (checked: boolean) => void;
};

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
