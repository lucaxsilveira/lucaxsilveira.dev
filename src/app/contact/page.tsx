import GradientText from '@/components/GradientText';
import React from 'react';

import ContactForm from '@/components/ContactForm';
import Social from '@/components/Social';
import Providers from '@/providers';

const Contact: React.FC = () => {
  return (
    <Providers>
      <div className="text-white md:pt-6">
        <div className="flex flex-col pb-4 pt-[120px] lg:max-h-screen">
          <GradientText className="from-pink-300 to-rose-700">
            Que bom de te ver por aqui.
          </GradientText>

          <div className="text-bold-white mt-4 flex flex-col gap-4 text-gray-400">
            <p>
              Se tiver alguma dúvida, sugestão ou só quiser{' '}
              <strong>bater um papo</strong>, estou à disposição! Você pode me
              enviar um <strong>e-mail</strong> ou me encontrar nas{' '}
              <strong>redes sociais</strong>. Mal posso esperar para conversar
              com você!
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="">
              <ContactForm />
            </div>
            <div className="mt-auto flex gap-2 text-gray-300">
              <Social />
            </div>
          </div>
        </div>
      </div>
    </Providers>
  );
};

export default Contact;
