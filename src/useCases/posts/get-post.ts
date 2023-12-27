import type { QueryParams } from '@sanity/client';
import groq from 'groq';

import { sanityFetch } from '@/services/sanity';
import { IPost } from '@/types/post';
import { formatDateTime, formatReadingTime } from '@/utils/date';
import { LocaleNames } from '@/utils/language';

interface GetPostParams {
  slug: string;
  params?: QueryParams;
  lang: LocaleNames;
}

const getPost = async (
  { slug, lang, params }: GetPostParams = {} as GetPostParams,
): Promise<IPost> => {
  try {
    const [post] = await sanityFetch<IPost[]>({
      query: groq`*[language == "${lang}" && slug.current == "${slug}"]{
      title,
      subtitle,
      slug,
      mainImage,
      language,
      publishedAt,
      body,
      author->{
        name,
        bio,
        slug,
        image,
      },
      categories[]->{
        title,
        description
      }
    }`,
      tags: ['post'],
      ...params,
    });

    if (!post) throw new Error('Post not found');

    post.readingTime = formatReadingTime(post.body, lang);
    post.date = formatDateTime(post.publishedAt, lang) || '';

    return post;
  } catch (error: any) {
    throw new Error(error);
  }
};

export { getPost };
