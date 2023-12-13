import type { QueryParams } from '@sanity/client';
import groq from 'groq';

import { sanityFetch } from '@/services/sanity';
import { IPost } from '@/types/post';
import { formatDateTime, formatReadingTime } from '@/utils/date';

const DEFAULT_PARAMS = {} as QueryParams;

const getPosts = async (params = DEFAULT_PARAMS): Promise<IPost[]> => {
  try {
    let { page = 0, perPage = 10, orderBy = 'publishedAt desc' } = params;
    page = page > 0 ? page * perPage : 0;
    perPage = page > 0 ? perPage + 1 : perPage;

    const posts = await sanityFetch<IPost[]>({
      query: groq`*[_type == "post"]  | order(${orderBy}) [${page}...${perPage}]{
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
    return posts.map((post) => ({
      ...post,
      date: formatDateTime(post.publishedAt) || '',
      readingTime: formatReadingTime(post.body),
    }));
  } catch (error: any) {
    throw new Error(error);
  }
};

export { getPosts };
