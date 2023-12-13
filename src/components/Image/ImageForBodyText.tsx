'use server';

import { SanityImageSource } from '@sanity/asset-utils';
import Image from './index';

type Value = {
  legend?: string;
  alt?: string;
} & SanityImageSource;

type ImageProps = {
  value: Value;
  isInline: boolean;
  className?: string;
};

const ImageForBodyText = ({ value, isInline, className }: ImageProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Image.Image value={value} isInline={isInline} className={className} />
      <Image.Legend legend={value.legend} />
    </div>
  );
};

export default ImageForBodyText;
