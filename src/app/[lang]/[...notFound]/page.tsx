'use client';
import React, { useEffect, useMemo } from 'react';

import { useRouter } from 'next/navigation';

import GradientText from '@/components/GradientText';
import LottieIcon from '@/components/Lottie';

import useCheckMobileScreen from '@/hooks/useCheckMobileScreen';
import { NextLangParams } from '@/types/next';
import { isMac } from '@/utils/browser';
import { getDictionary } from '../dictionaries';

import './styles.css';

const NotFound: React.FC<NextLangParams> = ({ params: { lang } }) => {
  const router = useRouter();
  const isMobile = useCheckMobileScreen();

  const dict = useMemo(() => getDictionary(lang), [lang]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'i') {
        router.push('/');
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col justify-center pb-4 md:max-h-screen">
      <div className="flex">
        <LottieIcon
          icon="glasses"
          animate
          autoplay
          height={isMobile ? 120 : 160}
          width={isMobile ? 120 : 160}
          speed={0.7}
        />
      </div>
      <GradientText className="min-h-[60px] from-yellow-300 to-orange-700">
        {dict.notFound.title}
      </GradientText>
      <div className="text-bold-white description-text mt-2 text-gray-400">
        <span
          dangerouslySetInnerHTML={{
            __html: dict.notFound.text,
          }}
        ></span>
        <span className="pointer-events-none mx-2 rounded-md bg-white px-2 py-[2px] font-mono text-sm text-gray-700">
          {' '}
          {isMac ? '⌘ + I' : 'CTRL + I'}
        </span>
        <span
          dangerouslySetInnerHTML={{
            __html: dict.notFound.text2,
          }}
        ></span>
      </div>
    </div>
  );
};

export default NotFound;
