import { Rubik } from 'next/font/google';
import { headers } from 'next/headers';
import Script from 'next/script';

import FlashlightBackground from '@/components/FlashlightBackground';
import Analytics from '@/layout/Analytics';
import Header from '@/layout/Header';

import { IReactChildren } from '@/types/react';
import { LocaleNames, locales } from '@/utils/language';

import '@/styles/globals.css';
import '@/styles/tailwind.css';

const rubik = Rubik({ subsets: ['latin'] });

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

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
    <html lang={lang}>
      <body
        className={`${rubik.className} bg-backgroud leading-relaxed antialiased selection:bg-cyan-400 selection:text-cyan-900`}
      >
        <Header isMac={isMac} />
        <FlashlightBackground>
          <div className="min-h-screen text-gray-400">
            <div className="min-h-screen lg:flex lg:justify-between lg:gap-12">
              {children}
            </div>
          </div>
        </FlashlightBackground>
        {/* must be in body for Hydration issues */}
        <div id="search-wrapper" />
      </body>

      <Script
        src="https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js"
        type="text/javascript"
      />
      <Analytics />
    </html>
  );
}
