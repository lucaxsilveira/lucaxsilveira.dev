import type { QueryParams } from '@sanity/client';
import groq from 'groq';

import { sanityFetch } from '@/services/sanity';
import { IPost } from '@/types/post';

interface GetPostParams {
  slug: string;
  params?: QueryParams;
}

const getPost = async (
  { slug, params }: GetPostParams = {} as GetPostParams,
): Promise<IPost> => {
  try {
    const [post] = await sanityFetch<IPost[]>({
      query: groq`*[slug.current == '${slug}']{
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
      tags: ['post'],
      ...params,
    });
    return post;
  } catch (error) {
    throw new Error(error);
  }
};

export { getPost };
