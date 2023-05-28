import React from 'react';
import { TextInput } from '@gravity-ui/uikit';

import { TEXTAREA_PLACEHOLDER } from '../../utils/constants';

import styles from './Input.module.css';

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const Input = ({ value, onChange }: InputProps) => {
  return (
    <TextInput
      className={styles.input}
      size={'m'}
      type={'text'}
      rows={10}
      onChange={onChange}
      placeholder={TEXTAREA_PLACEHOLDER}
      value={value}
      multiline
      hasClear
    />
  );
};
