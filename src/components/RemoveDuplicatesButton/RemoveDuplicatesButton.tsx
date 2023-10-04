import React from 'react';

import { SquareMinus } from '@gravity-ui/icons';

import { Button } from 'src/components/Button';
import { REMOVE_DUPLICATES_BUTTON } from 'src/utils/constants';

export type RemoveDuplicatesButtonsProps = {
  isEmptyList: boolean;
  onRemoveDuplicates: () => void;
};

export const RemoveDuplicatesButton = ({
  isEmptyList,
  onRemoveDuplicates,
}: RemoveDuplicatesButtonsProps) => {
  return (
    <Button
      icon={SquareMinus}
      text={REMOVE_DUPLICATES_BUTTON.label}
      view={'flat'}
      onClick={onRemoveDuplicates}
      disabled={isEmptyList}
    />
  );
};
