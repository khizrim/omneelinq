import { useState } from 'react';

export const useErrorMessage = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const resetErrorMessage = () => setErrorMessage('');

  return { errorMessage, setErrorMessage, resetErrorMessage };
};
