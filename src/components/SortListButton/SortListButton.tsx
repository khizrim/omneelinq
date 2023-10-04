import React, { useState } from 'react';

import {
  BarsAscendingAlignRight,
  BarsDescendingAlignRight,
} from '@gravity-ui/icons';

import { Button } from 'src/components';

export type SortListButtonProps = {
  onClick: () => void;
};

export const SortListButton = ({ onClick }: SortListButtonProps) => {
  const [isSorted, setIsSorted] = useState(false);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = () => {
    setIsSorted(true);
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    onClick();
  };

  return (
    <Button
      onClick={handleSort}
      icon={
        sortDirection === 'asc'
          ? BarsAscendingAlignRight
          : BarsDescendingAlignRight
      }
      view={'flat'}
      selected={isSorted}
    />
  );
};
