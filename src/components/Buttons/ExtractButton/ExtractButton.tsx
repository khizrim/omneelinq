import React from 'react';

import { BroomMotion } from '@gravity-ui/icons';

import { Button, type ButtonProps } from 'src/components/Button';
import { EXTRACT_BUTTON } from 'src/utils/constants';

export const ExtractButton = ({ disabled, onClick, ...props }: ButtonProps) => (
  <Button
    icon={BroomMotion}
    disabled={disabled}
    onClick={onClick}
    tooltip={EXTRACT_BUTTON.tooltip}
    {...props}
  >
    {EXTRACT_BUTTON.label}
  </Button>
);
