'use client';

import useClipboard from '@/hooks/useClipboard';
import { ClipboardCopy } from 'lucide-react';
import { useCallback } from 'react';

interface ICopyButton {
  code: string;
}

const CopyButton = ({ code }: ICopyButton) => {
  const { isCopied, copy } = useClipboard();

  const handleCopy = useCallback(() => {
    copy(code);
  }, [copy, code]);

  return (
    <div className="copy flex cursor-pointer rounded-lg">
      <button
        onClick={handleCopy}
        className={`${
          isCopied ? 'text-green-700' : 'text-gray-700'
        } transition-colors`}
      >
        <ClipboardCopy height={18} />
      </button>
    </div>
  );
};

export default CopyButton;
