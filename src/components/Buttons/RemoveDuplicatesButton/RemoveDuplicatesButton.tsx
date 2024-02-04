import React from 'react';

import { CopyMinus } from '@gravity-ui/icons';
import type { ButtonProps } from '@gravity-ui/uikit';

import { Button } from 'src/components/Button';
import { REMOVE_DUPLICATES_BUTTON } from 'src/utils/constants';

export type RemoveDuplicatesButtonsProps = {
  onRemoveDuplicates: () => void;
} & ButtonProps;

export const RemoveDuplicatesButton = ({
  onRemoveDuplicates,
  ...props
}: RemoveDuplicatesButtonsProps) => {
  return (
    <Button
      icon={CopyMinus}
      view={'flat'}
      onClick={onRemoveDuplicates}
      {...props}
    >
      {REMOVE_DUPLICATES_BUTTON.label}
    </Button>
  );
};
