import React from 'react';

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

type OptionsProps = Partial<SortListButtonProps & RemoveDuplicatesButtonsProps>;

export const Options = ({
  disabled,
  onRemoveDuplicates,
  onSort,
}: OptionsProps) => (
  <Flex justifyContent={'space-between'} alignItems={'center'}>
    <Flex gap={4}>
      <LazyLoadSwitch />
      <PasteHtmlSwitch />
    </Flex>
    <Flex gap={4}>
      {onRemoveDuplicates && (
        <RemoveDuplicatesButton
          disabled={disabled}
          onRemoveDuplicates={onRemoveDuplicates}
        />
      )}
      {onSort && <SortListButton disabled={disabled} onSort={onSort} />}
    </Flex>
  </Flex>
);
