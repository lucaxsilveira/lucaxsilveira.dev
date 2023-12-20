'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import GradientText from '@/components/GradientText';
import LottieIcon from '@/components/Lottie';
import { isMac } from '@/utils/browser';

const NotFound: React.FC = () => {
  const router = useRouter();

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
    <div className="flex flex-col justify-center pb-4 lg:max-h-screen">
      <div className="flex">
        <LottieIcon
          icon="glasses"
          animate
          autoplay
          height={160}
          width={160}
          speed={0.7}
        />
      </div>
      <GradientText className="from-yellow-300 to-orange-700">
        Página não encontrada.
      </GradientText>
      <div className="text-bold-white mt-2 flex flex-col gap-4 text-gray-400">
        <p>
          Parece que você deu de cara com um{' '}
          <strong>Guardião do Segredo</strong> ou um{' '}
          <strong>Mapa do Maroto</strong> fora de ordem. Talvez a gente precise
          da ajuda do <strong>Nick-Quase-Sem-Cabeça</strong> para orientar você
          de volta ao corredor principal de Hogwarts. Não se preocupe,{' '}
          <strong>
            até o Harry já se perdeu na Sala Precisa uma vez ou outra.
          </strong>
        </p>
        <p>
          Tente <strong>&rsquo;Accio Página Inicial&rsquo;</strong> ou{' '}
          <strong>conjure o teletransporte</strong> pressionando
          <span className="pointer-events-none mx-2 rounded-md bg-white px-2 py-[2px] font-mono text-sm text-gray-700">
            {isMac ? '⌘ + I' : 'CTRL + I'}
          </span>
          para começar uma nova jornada mágica!
        </p>
      </div>
    </div>
  );
};

export default NotFound;
