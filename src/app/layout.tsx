import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import Script from 'next/script';

import Analytics from '@/layout/Analytics';
import { IReactChildren } from '@/types/react';

import '@/styles/globals.css';
import '@/styles/tailwind.css';

const rubik = Rubik({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lucas Silveira',
  description: 'Front-end Entusiast.',
};

export default function RootLayout({ children }: IReactChildren) {
  return (
    <html lang="en">
      <body className={rubik.className}>{children}</body>
      <Script
        src="https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js"
        type="text/javascript"
      />
      <Analytics />
    </html>
  );
}
