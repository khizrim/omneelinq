import React, { useCallback, useEffect, useState } from 'react';

import {
  BarsAscendingAlignRight,
  BarsDescendingAlignRight,
} from '@gravity-ui/icons';

import { Button } from 'src/components/Button';
import { LOCAL_STORAGE_SORT_KEY } from 'src/utils/constants';

import type {
  SortDirection,
  SortListButtonProps,
} from './SortListButton.types';

export const SortListButton = ({ disabled, onSort }: SortListButtonProps) => {
  const storedSortDirection: SortDirection = localStorage.getItem(
    LOCAL_STORAGE_SORT_KEY
  ) as SortDirection;

  const [isSorted, setIsSorted] = useState<boolean>(
    !!storedSortDirection || false
  );

  const [sortDirection, setSortDirection] = useState<SortDirection>(
    storedSortDirection || 'asc'
  );

  useEffect(() => {
    if (disabled) {
      setIsSorted(false);
    }
  }, [disabled]);

  useEffect(() => {
    localStorage.setItem('sort', sortDirection);
  }, [sortDirection]);

  const handleSort = useCallback(() => {
    if (disabled) {
      setIsSorted(false);
      return;
    }

    const updatedSortDirection =
      sortDirection === 'asc' && !isSorted
        ? sortDirection
        : sortDirection === 'asc' && isSorted
        ? 'desc'
        : 'asc';

    setSortDirection(updatedSortDirection);
    setIsSorted(true);

    onSort(updatedSortDirection);
  }, [disabled, isSorted, onSort, sortDirection]);

  return (
    <Button
      icon={
        sortDirection === 'asc'
          ? BarsAscendingAlignRight
          : BarsDescendingAlignRight
      }
      view={'flat'}
      onClick={handleSort}
      selected={isSorted}
      disabled={disabled}
    />
  );
};
