import { SanityImageSource, getImageDimensions } from '@sanity/asset-utils';
import NextImage from 'next/image';

import { urlForImage } from '@/utils/image-builder';

type Value = {
  legend?: string;
  alt?: string;
} & SanityImageSource;

export type ImageProps = {
  value: Value;
  isInline: boolean;
  className?: string;
};

const Image = ({ value, isInline, className }: ImageProps) => {
  const { width, height } = getImageDimensions(value);
  const { legend, alt } = value;

  return (
    <NextImage
      src={urlForImage(value)
        .width(isInline ? 100 : 800)
        .fit('max')
        .auto('format')
        .url()}
      alt={alt || legend || ' '}
      width={width}
      height={height}
      loading="lazy"
      style={{
        display: isInline ? 'inline-block' : 'block',
        aspectRatio: width / height,
      }}
      className={className}
    />
  );
};

export default Image;
