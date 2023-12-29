import { Fragment } from 'react';

import { LayoutProps, NextLangParams } from '@/types/next';
import { getAuthor } from '@/useCases/authors/get-author';
import { getDictionary } from '@/utils/dictionaries';
import { generatePageMetadata } from '@/utils/metadata';

// use this when the page.tsx its a client component
export const generateMetadata = async ({
  params: { lang },
}: NextLangParams) => {
  const { image } = await getAuthor({ slug: 'lucas', lang });
  const dict = getDictionary(lang);

  return generatePageMetadata({
    image,
    title: dict.contact.title,
    description: dict.contact.description,
  });
};

export default function RootLayout(props: LayoutProps) {
  return <Fragment {...props}>{props.children}</Fragment>;
}
