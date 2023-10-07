import React from 'react';

import { TextArea, type TextAreaProps } from '@gravity-ui/uikit';

import { TEXTAREA_PLACEHOLDER } from 'src/utils/constants';

type InputProps = Pick<TextAreaProps, 'value' | 'onChange' | 'errorMessage'>;

export const Input = ({ value, onChange, errorMessage }: InputProps) => (
  <TextArea
    autoFocus={true}
    value={value}
    size={'m'}
    rows={15}
    style={{ lineHeight: '1.8', height: '266px' }}
    placeholder={TEXTAREA_PLACEHOLDER}
    validationState={errorMessage ? 'invalid' : undefined}
    errorMessage={errorMessage}
    errorPlacement={'inside'}
    onChange={onChange}
    hasClear
  />
);
