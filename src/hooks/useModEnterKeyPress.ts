import { useEffect, useState } from 'react';

export const useModEnterKeyPress = (callback: () => void) => {
  const [modifierKeyPressed, setModifierKeyPressed] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Meta' || event.key === 'Control') {
        setModifierKeyPressed(true);
      }
      if (event.key === 'Enter' && modifierKeyPressed) {
        callback();
      }
    };

    const handleKeyUp = (event: KeyboardEvent): void => {
      if (event.key === 'Meta' || event.key === 'Control') {
        setModifierKeyPressed(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [modifierKeyPressed]);
};
