import React, { useState } from 'react';

import { Gear, Xmark } from '@gravity-ui/icons';
import { Flex } from '@gravity-ui/uikit';

import {
  RemoveDuplicatesButton,
  type RemoveDuplicatesButtonsProps,
} from 'src/components/Buttons/RemoveDuplicatesButton';
import {
  SortListButton,
  type SortListButtonProps,
} from 'src/components/Buttons/SortListButton';
import { LazyLoadSwitch } from 'src/components/Switches/LazyLoadSwitch';
import { PasteHtmlSwitch } from 'src/components/Switches/PasteHtmlSwitch';

import { Button } from '../Button';

type OptionsProps = Partial<SortListButtonProps & RemoveDuplicatesButtonsProps>;

export const Options = ({
  disabled,
  onRemoveDuplicates,
  onSort,
}: OptionsProps) => {
  const [areSettingsOpen, setAreSettingsOpen] = useState<boolean>(false);

  const handleSettingsClick = () => {
    setAreSettingsOpen((prevState) => !prevState);
  };

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'}>
      <Flex gap={4}>
        {onSort && <SortListButton disabled={disabled} onSort={onSort} />}
        {onRemoveDuplicates && (
          <RemoveDuplicatesButton
            disabled={disabled}
            onRemoveDuplicates={onRemoveDuplicates}
          />
        )}
      </Flex>
      <Flex gap={4} alignItems={'center'}>
        {areSettingsOpen && (
          <>
            <LazyLoadSwitch />
            <PasteHtmlSwitch />
          </>
        )}
        <Button
          onClick={handleSettingsClick}
          icon={areSettingsOpen ? Xmark : Gear}
          view={'flat'}
        />
      </Flex>
    </Flex>
  );
};
