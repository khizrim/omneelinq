import { useEffect } from 'react';

export const usePaste = (
  callback: (e: ClipboardEvent, pasteHtml: boolean) => void,
  pasteHtml: boolean
) => {
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();

      callback(e, pasteHtml);
    };

    window.addEventListener('paste', handlePaste);

    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, [callback]);
};
