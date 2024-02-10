import React, { useCallback } from 'react';

import { TextArea, type TextAreaProps } from '@gravity-ui/uikit';

import { getLinksFromHtml } from 'src/helpers/get-links-from-html';
import { usePaste } from 'src/hooks/usePaste';
import { useUrls } from 'src/hooks/useUrls';
import { useSettingsStore } from 'src/store/store';
import {
  LOCAL_STORAGE_PASTE_HTML_KEY,
  TEXTAREA_PLACEHOLDER,
} from 'src/utils/constants';

type InputProps = Pick<TextAreaProps, 'value' | 'onChange' | 'errorMessage'>;

export const Input = ({ value, onChange, errorMessage }: InputProps) => {
  const [settings] = useSettingsStore();

  const { setUrls } = useUrls();

  const handlePaste = useCallback(
    (e: ClipboardEvent, pasteHtml: boolean) => {
      const textarea = e.target as HTMLTextAreaElement;

      const [start, end] = [
        textarea.selectionStart || 0,
        textarea.selectionEnd || 0,
      ];
      const textAreaValue = textarea.value;

      const clipboardDataKey = pasteHtml ? 'text/html' : 'text/plain';
      let clipboardData = e.clipboardData?.getData(clipboardDataKey) || '';

      if (pasteHtml) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = clipboardData;

        const links = getLinksFromHtml(tempDiv, false);
        clipboardData = links.join('\n');
      }

      const updatedValue =
        textAreaValue.substring(0, start) +
        clipboardData +
        textAreaValue.substring(end);

      setUrls(updatedValue);

      textarea.selectionStart = start + clipboardData.length;
      textarea.selectionEnd = start + clipboardData.length;
    },
    [getLinksFromHtml, setUrls]
  );

  usePaste(handlePaste, settings[LOCAL_STORAGE_PASTE_HTML_KEY] === 'on');

  return (
    <TextArea
      autoFocus={true}
      value={value}
      size={'l'}
      rows={15}
      style={{ lineHeight: '1.8', height: '286px' }}
      placeholder={TEXTAREA_PLACEHOLDER}
      validationState={errorMessage ? 'invalid' : undefined}
      errorMessage={errorMessage}
      errorPlacement={'inside'}
      onChange={onChange}
      hasClear
    />
  );
};
