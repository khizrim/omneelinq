import React, { useCallback, useEffect, useState } from 'react';

import {
  BarsAscendingAlignLeftArrowDown,
  BarsDescendingAlignLeftArrowUp,
} from '@gravity-ui/icons';

import { Button } from 'src/components/Button';
import { useSettingsStore } from 'src/store/store';
import { LOCAL_STORAGE_SORT_KEY } from 'src/utils/constants';

import type {
  SortDirection,
  SortListButtonProps,
} from './SortListButton.types';

export const SortListButton = ({ disabled, onSort }: SortListButtonProps) => {
  const [settings, setSettings] = useSettingsStore();

  const [isSorted, setIsSorted] = useState<boolean>(false);

  useEffect(() => {
    if (disabled) {
      setIsSorted(false);
    }
  }, [disabled]);

  useEffect(() => {
    setIsSorted(settings[LOCAL_STORAGE_SORT_KEY] !== 'unset');
  });

  const handleSort = useCallback(() => {
    if (disabled) {
      setIsSorted(false);
      setSettings((prevState) => {
        return {
          ...prevState,
          [LOCAL_STORAGE_SORT_KEY]: 'unset',
        };
      });
      return;
    }

    const updatedSortDirection: SortDirection =
      settings[LOCAL_STORAGE_SORT_KEY] === 'asc' && !isSorted
        ? settings[LOCAL_STORAGE_SORT_KEY]
        : settings[LOCAL_STORAGE_SORT_KEY] === 'asc' && isSorted
          ? 'desc'
          : 'asc';

    setSettings((prevState) => {
      return {
        ...prevState,
        [LOCAL_STORAGE_SORT_KEY]: updatedSortDirection,
      };
    });
    setIsSorted(true);

    onSort(updatedSortDirection);
  }, [disabled, isSorted, onSort, settings]);

  return (
    <Button
      icon={
        settings[LOCAL_STORAGE_SORT_KEY] === 'desc'
          ? BarsDescendingAlignLeftArrowUp
          : BarsAscendingAlignLeftArrowDown
      }
      view={'outlined'}
      onClick={handleSort}
      selected={isSorted}
      disabled={disabled}
    />
  );
};
