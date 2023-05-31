import React from 'react';
import { HelpPopover, Switch, Text } from '@gravity-ui/uikit';

import { LAZYLOAD_SWITCH_TEXTS } from '../../utils/constants';

import styles from './LazyLoadSwitch.module.css';

export type LazyLoadSwitchProps = {
  lazyLoad: boolean;
  onToggle: (checked: boolean) => void;
};

export const LazyLoadSwitch = ({ lazyLoad, onToggle }: LazyLoadSwitchProps) => {
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(event.target.checked);
  };

  return (
    <div className={styles.switch}>
      <Switch checked={lazyLoad} onChange={handleToggle} />
      <Text>{LAZYLOAD_SWITCH_TEXTS.label}</Text>
      <HelpPopover content={LAZYLOAD_SWITCH_TEXTS.helpPopover} />
    </div>
  );
};
