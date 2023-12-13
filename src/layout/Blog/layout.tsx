import Script from 'next/script';

import Header from '@/layout/Header';
import '@/styles/tailwind.css';
import { IReactChildren } from '@/types/react';

export default function RootLayout({ children }: IReactChildren) {
  return (
    <html lang="en" id="html2">
      <body>
        <Header></Header>
        <div className="mt-10">{children}</div>
      </body>

      <Script
        src="https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js"
        type="text/javascript"
      />
    </html>
  );
}
