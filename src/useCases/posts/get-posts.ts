import type { QueryParams } from '@sanity/client';
import groq from 'groq';

import { sanityFetch } from '@/services/sanity';
import { IPost } from '@/types/post';

interface GetPostsParams {
  params?: QueryParams;
}

const DEFAULT_PARAMS = {} as QueryParams;

const getPosts = ({ params = DEFAULT_PARAMS }: GetPostsParams = {}): Promise<
  IPost[]
> => {
  return sanityFetch<IPost[]>({
    query: groq`*[_type == "post"]{
      title,
      subtitle,
      slug,
      mainImage,
      publishedAt,
      body,
      author->{
        name,
        bio,
        slug,
        "photo": image,
      },
      categories[]->{
        title,
        description
      }
    }`,
    tags: ['posts'],
    ...params,
  });
};

export { getPosts };
