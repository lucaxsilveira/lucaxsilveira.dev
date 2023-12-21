'use client';

import { useCallback } from 'react';

import { Share } from 'lucide-react';

import useClipboard from '@/hooks/useClipboard';

const PostShare = () => {
  const { isCopied, copy } = useClipboard();

  const handleShare = useCallback(() => {
    const url = window.location.href;
    if (navigator.share) {
      return navigator.share({
        title: document.title,
        url,
      });
    }
    copy(url);
  }, [copy]);

  return (
    <div className="post__share text-gray-500">
      <button
        onClick={handleShare}
        className={`${
          isCopied ? 'text-green-700' : 'text-gray-700'
        } transition-colors	`}
      >
        <Share height={20} />
      </button>
    </div>
  );
};

export default PostShare;
