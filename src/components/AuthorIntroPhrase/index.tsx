'use client';
import React from 'react';

import LottieIcon from '@/components/Lottie';

const AuthorIntroPhrase: React.FC = () => {
  return (
    <>
      <h2 className="mt-3 flex items-center gap-2 text-xl tracking-wide text-gray-200">
        Front-End Enthusiast
        <LottieIcon
          data-testid="lottie"
          animate={true}
          icon="heart"
          autoplay={true}
        />
      </h2>
    </>
  );
};

export default AuthorIntroPhrase;
