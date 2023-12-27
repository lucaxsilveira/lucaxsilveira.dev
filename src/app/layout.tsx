import { Rubik } from 'next/font/google';
import Script from 'next/script';
const rubik = Rubik({ subsets: ['latin'] });

import Analytics from '@/layout/Analytics';

import '@/styles/globals.css';
import '@/styles/tailwind.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${rubik.className}`}>{children}</body>

      <Script
        src="https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js"
        type="text/javascript"
      />
      <Analytics />
    </html>
  );
}
