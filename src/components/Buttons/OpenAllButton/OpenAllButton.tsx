import React from 'react';

import { ArrowUpRightFromSquare } from '@gravity-ui/icons';

import { Button, type ButtonProps } from 'src/components/Button';
import { OPEN_ALL_URLS_BUTTON } from 'src/utils/constants';

export const OpenAllButton = ({ disabled, onClick, ...props }: ButtonProps) => (
  <Button
    icon={ArrowUpRightFromSquare}
    view={'action'}
    disabled={disabled}
    onClick={onClick}
    tooltip={OPEN_ALL_URLS_BUTTON.tooltip}
    {...props}
  >
    {OPEN_ALL_URLS_BUTTON.label}
  </Button>
);
