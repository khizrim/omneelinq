import React from 'react';

import { ClipboardButton, Flex, Text } from '@gravity-ui/uikit';

import type { SortDirection } from 'src/components/Buttons';
import {
  ExtractButton,
  OpenAllButton,
  ListTabsButton,
} from 'src/components/Buttons';
import { Input } from 'src/components/Input';
import { Options } from 'src/components/Options';
import { LINKS_COUNT_TEXT } from 'src/utils/constants';

export type FormProps = {
  disabled: boolean;
  value: string;
  urlsCount?: number;
  errorMessage: string;
  onSort: (sortDirection: SortDirection) => void;
  onChange: (e: { target: { value: React.SetStateAction<string> } }) => void;
  onRemoveDuplicates: () => void;
  onParseTabs: () => Promise<void>;
  onExtract: () => void;
  onOpenAll: () => void;
};
export const Form = ({
  value,
  urlsCount,
  disabled,
  errorMessage,
  onSort,
  onChange,
  onRemoveDuplicates,
  onParseTabs,
  onExtract,
  onOpenAll,
}: FormProps) => (
  <>
    <Options
      disabled={disabled}
      onRemoveDuplicates={onRemoveDuplicates}
      onSort={onSort}
    />
    <Input value={value} onChange={onChange} errorMessage={errorMessage} />
    <Flex justifyContent={'space-between'} alignItems={'center'}>
      <Flex>
        <ListTabsButton onClick={onParseTabs} />
      </Flex>
      {urlsCount && <Text>{`${LINKS_COUNT_TEXT} ${urlsCount}`}</Text>}
      <Flex space={2} alignItems={'center'}>
        {!disabled && <ClipboardButton text={value} size={18} />}
        <ExtractButton disabled={disabled} onClick={onExtract} />
        <OpenAllButton disabled={disabled} onClick={onOpenAll} />
      </Flex>
    </Flex>
  </>
);
