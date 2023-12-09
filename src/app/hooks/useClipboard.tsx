import { useCallback, useState } from 'react';

const useClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000);
    });
  }, []);

  return { isCopied, copy };
};

export default useClipboard;
