import React from 'react';

import { ArrowDownFromLine } from '@gravity-ui/icons';

import { Button, type ButtonProps } from 'src/components/Button';
import { PARSE_TAB_URLS_BUTTON } from 'src/utils/constants';

export const ParseTabsButton = ({ onClick, ...props }: ButtonProps) => (
  <Button
    icon={ArrowDownFromLine}
    onClick={onClick}
    tooltip={PARSE_TAB_URLS_BUTTON.tooltip}
    {...props}
  >
    {PARSE_TAB_URLS_BUTTON.label}
  </Button>
);
