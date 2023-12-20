import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import Script from 'next/script';

import Analytics from '@/layout/Analytics';
import { IReactChildren } from '@/types/react';

import FlashlightBackground from '@/components/FlashlightBackground';
import Header from '@/layout/Header';

import '@/styles/globals.css';
import '@/styles/tailwind.css';
import { headers } from 'next/headers';

const rubik = Rubik({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lucas Silveira',
  description: 'Front-end Entusiast.',
};

export default function RootLayout({ children }: IReactChildren) {
  const headersList = headers();
  const isMac = headersList.get('user-agent')?.includes('Macintosh');

  return (
    <html lang="en">
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
      </body>

      <div id="search-wrapper" className="" />
      <Script
        src="https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js"
        type="text/javascript"
      />
      <Analytics />
    </html>
  );
}
