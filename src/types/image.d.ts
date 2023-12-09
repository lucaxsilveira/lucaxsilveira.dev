import { SanityImageSource } from '@sanity/asset-utils';

// export interface IImage extends SanityImageSource {
//   alt?: string;
//   legend?: string;
//   asset: {
//     url: string;
//   };
// }

export type IImage = {
  legend?: string;
  alt?: string;
} & SanityImageSource;
