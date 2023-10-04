import React from 'react';

import { SquareMinus } from '@gravity-ui/icons';

import { Button } from 'src/components/Button';

type RemoveDuplicatesButtonsProps = {
  onClick: () => void;
};

export const CleanupDuplicatesButton = ({
  onClick,
}: RemoveDuplicatesButtonsProps) => {
  return (
    <Button
      icon={SquareMinus}
      text={'Cleanup Duplicates'}
      view={'flat'}
      onClick={onClick}
    />
  );
};
