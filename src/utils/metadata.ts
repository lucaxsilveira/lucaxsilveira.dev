import { toPlainText } from '@portabletext/react';
import { isEmpty, truncate } from 'lodash';
import { PortableTextBlock } from 'sanity';

import { IImage } from '@/types/image';

import { urlForImage } from './image-builder';

interface IMetadataProps {
  image: IImage;
  description: string | PortableTextBlock[];
  title: string;
}

export const generatePageMetadata = ({
  image,
  description,
  title,
}: IMetadataProps) => {
  let images: any = [];
  let imageUrl: string | undefined;
  let descriptionText = '';

  if (!isEmpty(image) && image) {
    imageUrl = urlForImage(image).width(400).fit('max').auto('format').url();
    images = [imageUrl];
  }

  let bodyText = null;
  if (typeof description === 'string') {
    bodyText = description.replace(/<\/?[^>]+(>|$)/g, '');
  } else {
    bodyText = toPlainText(description);
  }

  descriptionText = bodyText.replaceAll('\n', ' ');
  descriptionText = truncate(descriptionText, {
    length: 150,
    separator: /,? +/,
  });

  return {
    title,
    description: descriptionText,
    openGraph: {
      title,
      description: descriptionText,
      images: [...images],
    },
    og: {
      title,
      description: descriptionText,
      image: imageUrl,
    },
    twitter: {
      title,
      description: descriptionText,
      image: imageUrl,
    },
  };
};
