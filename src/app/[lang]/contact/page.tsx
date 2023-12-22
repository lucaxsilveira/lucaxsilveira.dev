import React, { useMemo } from 'react';

import ContactForm from '@/components/ContactForm';
import GradientText from '@/components/GradientText';
import Social from '@/components/Social';
import Providers from '@/providers';
import { LocaleNames } from '@/utils/language';
import { getDictionary } from '../dictionaries';

interface IContact {
  params: {
    lang: LocaleNames;
  };
}

const Contact: React.FC<IContact> = ({ params: { lang } }) => {
  const dict = useMemo(() => getDictionary(lang), [lang]);

  return (
    <Providers>
      <div className="text-white md:pt-6">
        <div className="flex flex-col pb-4 pt-[90px] md:pt-[120px] lg:max-h-screen">
          <GradientText className="min-h-[60px] from-pink-300 to-rose-700">
            {dict.contact.title}
          </GradientText>

          <div className="text-bold-white mt-4 flex flex-col gap-4 text-gray-400">
            <p
              dangerouslySetInnerHTML={{ __html: dict.contact.description }}
            ></p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <ContactForm lang={lang} />
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
