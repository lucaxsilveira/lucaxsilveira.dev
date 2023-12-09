import BlogLayout from '@/layout/Blog/layout';

import { IReactChildren } from '@/types/react';

export default function RootLayout({ children }: IReactChildren) {
  return <BlogLayout>{children}</BlogLayout>;
}
