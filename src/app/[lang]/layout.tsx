import { Viewport } from 'next';
import { Rubik } from 'next/font/google';
import Script from 'next/script';

const rubik = Rubik({ subsets: ['latin'] });

import Analytics from '@/layout/Analytics';
import { LayoutProps } from '@/types/next';

import '@/styles/globals.css';
import '@/styles/tailwind.css';
import '@/styles/toast.css';

export const viewport: Viewport = {
  themeColor: '#0e0c12',
};

export default function RootLayout({
  children,
  params: { lang },
}: LayoutProps) {
  return (
    <html lang={lang} className={rubik.className}>
      {children}

      <Script
        src="https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js"
        type="text/javascript"
      />
      <Analytics />
    </html>
  );
}
