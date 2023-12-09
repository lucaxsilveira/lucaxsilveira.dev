import { SanityImageSource, getImageDimensions } from '@sanity/asset-utils';
import Image from 'next/image';

import { urlForImage } from '@/utils/image-builder';

type Value = {
  legend?: string;
  alt?: string;
} & SanityImageSource;

type ImageProps = {
  value: Value;
  isInline: boolean;
};

const ImageComponent = ({ value, isInline }: ImageProps) => {
  const { width, height } = getImageDimensions(value);
  const { legend, alt } = value;

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Image
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
      />
      {legend && (
        <small className="mt-2 block text-center text-gray-400">{legend}</small>
      )}
    </div>
  );
};

export default ImageComponent;
