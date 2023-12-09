import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import Script from 'next/script';

import '@/styles/globals.css';
import '@/styles/tailwind.css';
import { IReactChildren } from '@/types/react';

const rubik = Rubik({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'wip: wait for new updates',
};

export default function RootLayout({ children }: IReactChildren) {
  return (
    <html lang="en">
      <body className={rubik.className}>{children}</body>

      <Script
        src="https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js"
        type="text/javascript"
      />
    </html>
  );
}
