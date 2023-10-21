import React from 'react';

import { ArrowDownFromLine } from '@gravity-ui/icons';

import { Button, type ButtonProps } from 'src/components/Button';
import { LIST_TABS_URLS_BUTTON } from 'src/utils/constants';

export const ListTabsButton = ({ onClick, ...props }: ButtonProps) => (
  <Button
    icon={ArrowDownFromLine}
    onClick={onClick}
    tooltip={LIST_TABS_URLS_BUTTON.tooltip}
    {...props}
  >
    {LIST_TABS_URLS_BUTTON.label}
  </Button>
);
