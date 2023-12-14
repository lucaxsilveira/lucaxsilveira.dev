import Script from 'next/script';

import Header from '@/layout/Header';
import { IReactChildren } from '@/types/react';
import Analytics from '../Analytics';

import '@/styles/tailwind.css';

export default function RootLayout({ children }: IReactChildren) {
  return (
    <html lang="en" id="html2">
      <body>
        <Header></Header>
        <div className="lg:mt-10">{children}</div>
      </body>

      <Script
        src="https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js"
        type="text/javascript"
      />

      <Analytics />
    </html>
  );
}
