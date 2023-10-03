import React from 'react';

import {
  ActionTooltip,
  Switch as SwitchComponent,
  Text,
} from '@gravity-ui/uikit';

import styles from './Switch.module.css';

export type LazyLoadSwitchProps = {
  label?: string;
  popover?: string;
  state: boolean;
  onToggle: (checked: boolean) => void;
};

export const Switch = ({
  label,
  popover,
  state,
  onToggle,
}: LazyLoadSwitchProps) => {
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(event.target.checked);
  };

  return (
    <div className={styles.switch}>
      <ActionTooltip
        title={label || popover?.slice(0, 16) || ''}
        description={popover}
        openDelay={1000}
      >
        <SwitchComponent size={'m'} checked={state} onChange={handleToggle} />
      </ActionTooltip>
      <Text>{label}</Text>
    </div>
  );
};
