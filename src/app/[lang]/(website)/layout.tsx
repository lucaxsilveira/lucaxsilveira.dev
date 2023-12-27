import { headers } from 'next/headers';

import FlashlightBackground from '@/components/FlashlightBackground';
import Header from '@/layout/Header';
import { IReactChildren } from '@/types/react';
import { LocaleNames } from '@/utils/language';

type LayoutProps = {
  params: {
    lang: LocaleNames;
  };
} & IReactChildren;

export default function RootLayout({
  children,
  params: { lang },
}: LayoutProps) {
  const headersList = headers();
  const isMac = headersList.get('user-agent')?.includes('Macintosh');

  return (
    <div
      className={`bg-backgroud leading-relaxed antialiased selection:bg-cyan-400 selection:text-cyan-900`}
    >
      <Header light={false} isMac={isMac} lang={lang} />
      <FlashlightBackground>
        <div className="min-h-screen text-gray-400 ">
          <div className="min-h-screen lg:flex lg:justify-between lg:gap-12">
            {children}
          </div>
        </div>
      </FlashlightBackground>
      {/* must be in body for Hydration issues */}
      <div id="search-wrapper" />
    </div>
  );
}
