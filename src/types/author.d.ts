import { IImage } from './image';
import { ISlug } from './slug';

export interface IAuthor {
  name: string;
  photo: IImage;
  bio: any;
  slug: ISlug;
}
