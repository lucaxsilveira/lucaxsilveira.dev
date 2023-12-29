'use client';

import { useCallback } from 'react';

import { ClipboardCopy } from 'lucide-react';

import useClipboard from '@/hooks/useClipboard';

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
        data-testid="copy-button"
        onClick={handleCopy}
        className={`${
          isCopied ? 'text-green-700' : 'text-gray-700'
        } transition-colors`}
      >
        <ClipboardCopy data-testid="copy-icon" height={18} />
      </button>
    </div>
  );
};

export default CopyButton;
