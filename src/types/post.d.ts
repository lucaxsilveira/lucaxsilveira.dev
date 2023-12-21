import { PortableTextBlock } from 'sanity';

import { IAuthor } from './author';
import { ICategory } from './category';
import { IImage } from './image';
import { ISlug } from './slug';

export interface IPost {
  _id: string;
  title: string;
  subtitle?: string;
  slug: ISlug;
  mainImage: IImage;
  publishedAt?: string;
  description?: string;
  date?: string;
  body: PortableTextBlock[];
  author: IAuthor;
  categories?: ICategory[];
  readingTime: string;
}
