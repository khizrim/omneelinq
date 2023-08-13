import { useEffect } from 'react';

export const usePaste = (callback: (e: ClipboardEvent) => void) => {
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();

      callback(e);
    };

    window.addEventListener('paste', handlePaste);

    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, [callback]);
};
