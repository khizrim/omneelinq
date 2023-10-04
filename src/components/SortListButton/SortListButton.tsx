import React, { useCallback, useEffect, useState } from 'react';

import {
  BarsAscendingAlignRight,
  BarsDescendingAlignRight,
} from '@gravity-ui/icons';

import { Button } from 'src/components';

export type SortDirection = 'asc' | 'desc';

export type SortListButtonProps = {
  isEmptyList: boolean;
  onSort: (sortDirection: SortDirection) => void;
};

export const SortListButton = ({
  isEmptyList,
  onSort,
}: SortListButtonProps) => {
  const storedSortDirection = localStorage.getItem('sort');

  const [isSorted, setIsSorted] = useState(!!storedSortDirection || false);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    (storedSortDirection as SortDirection) || 'asc'
  );

  useEffect(() => {
    if (isEmptyList) {
      setIsSorted(false);
    }
  }, [isEmptyList]);

  useEffect(() => {
    localStorage.setItem('sort', sortDirection);
  }, [sortDirection]);

  const handleSort = useCallback(() => {
    if (!isEmptyList) {
      const isInitialSort = !isSorted;

      const updatedSortDirection =
        sortDirection === 'asc' && isInitialSort
          ? sortDirection
          : sortDirection === 'asc' && !isInitialSort
          ? 'desc'
          : 'asc';

      setSortDirection(updatedSortDirection);
      setIsSorted(true);

      onSort(updatedSortDirection);
    } else {
      setIsSorted(false);
    }
  }, [isEmptyList, isSorted, onSort, sortDirection]);

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
      disabled={isEmptyList}
    />
  );
};
