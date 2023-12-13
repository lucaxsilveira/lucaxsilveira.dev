import { PortableTextBlock } from 'sanity';
import { IImage } from './image';
import { ISlug } from './slug';

export interface IAuthor {
  name: string;
  image: IImage;
  cover: IImage;
  bio: PortableTextBlock[];
  slug: ISlug;
}
