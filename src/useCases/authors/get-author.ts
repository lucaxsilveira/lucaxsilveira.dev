import type { QueryParams } from '@sanity/client';
import groq from 'groq';

import { sanityFetch } from '@/services/sanity';
import { IAuthor } from '@/types/author';

interface GetPostParams {
  slug: string;
  lang: string;
  params?: QueryParams;
}

const getAuthor = async (
  { slug, lang, params }: GetPostParams = {} as GetPostParams,
): Promise<IAuthor> => {
  try {
    const response = await sanityFetch<IAuthor[]>({
      query: groq`*[language == '${lang}' && slug.current == '${slug}']{
      name,
      language,
      bio,
      slug,
      cover,
      image
    }`,
      tags: ['author'],
      ...params,
    });

    const [author] = response;

    return author;
  } catch (error: any) {
    throw new Error(error);
  }
};

export { getAuthor };
