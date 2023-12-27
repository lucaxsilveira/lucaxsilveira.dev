import { headers } from 'next/headers';

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
  ...props
}: LayoutProps) {
  const headersList = headers();
  const isMac = headersList.get('user-agent')?.includes('Macintosh');

  return (
    <div className="bg-white" {...props}>
      <Header light={true} isMac={isMac} lang={lang} />

      {children}

      {/* must be in body for Hydration issues */}
      <div id="search-wrapper" />
    </div>
  );
}
