import WebsiteLayout from '@/layout/Website';
import { LayoutProps } from '@/types/next';

export default function RootLayout(props: LayoutProps) {
  return <WebsiteLayout {...props}>{props.children}</WebsiteLayout>;
}
