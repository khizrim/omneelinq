import React from 'react';

import { ActionTooltip, Switch as SwitchComponent } from '@gravity-ui/uikit';

export type SwitchProps = {
  label?: string;
  popover?: string;
  state: boolean;
  onToggle: (checked: boolean) => void;
};

export const Switch = ({ label, popover, state, onToggle }: SwitchProps) => {
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(event.target.checked);
  };

  return (
    <ActionTooltip
      title={label || popover?.slice(0, 16) || ''}
      description={popover}
      openDelay={1000}
    >
      <SwitchComponent
        size={'m'}
        checked={state}
        onChange={handleToggle}
        content={label}
      />
    </ActionTooltip>
  );
};
