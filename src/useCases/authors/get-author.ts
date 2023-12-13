import type { QueryParams } from '@sanity/client';
import groq from 'groq';

import { sanityFetch } from '@/services/sanity';
import { IAuthor } from '@/types/author';

interface GetPostParams {
  slug: string;
  params?: QueryParams;
}

const getAuthor = async (
  { slug, params }: GetPostParams = {} as GetPostParams,
): Promise<IAuthor> => {
  try {
    const [author] = await sanityFetch<IAuthor[]>({
      query: groq`*[slug.current == '${slug}']{
      name,
      bio,
      slug,
      cover,
      image
    }`,
      tags: ['author'],
      ...params,
    });

    return author;
  } catch (error: any) {
    throw new Error(error);
  }
};

export { getAuthor };
