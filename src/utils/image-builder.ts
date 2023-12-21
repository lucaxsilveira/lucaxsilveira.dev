import imageUrlBuilder from '@sanity/image-url';

import { IImage } from '@/types/image';

import { client } from '../../sanity/lib/client';

const builder = imageUrlBuilder(client);

const urlForImage = (source: IImage) => {
  return builder.image(source);
};

export { urlForImage };
