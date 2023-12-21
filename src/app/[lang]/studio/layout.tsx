import SanityLayout from '@/layout/Sanity';

import { IReactChildren } from '@/types/react';

export default function RootLayout({ children }: IReactChildren) {
  return <SanityLayout>{children}</SanityLayout>;
}
