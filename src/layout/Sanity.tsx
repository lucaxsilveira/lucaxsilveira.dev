import { IReactChildren } from '@/types/react';

export default function RootLayout({ children }: IReactChildren) {
  return (
    <html lang="en" id="htmlsanity">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
