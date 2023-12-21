import { toPlainText } from '@portabletext/react';
import groq from 'groq';
import { truncate } from 'lodash';

import { sanityFetch } from '@/services/sanity';
import { IPost } from '@/types/post';
import { formatDateTime, formatReadingTime } from '@/utils/date';
import { buildQueryParams, IParams } from '@/utils/sanity';

const DEFAULT_PARAMS = {} as IParams;

const getPosts = async (params = DEFAULT_PARAMS): Promise<IPost[]> => {
  try {
    let { page, perPage, orderBy, filters } = buildQueryParams(params);

    const posts = await sanityFetch<IPost[]>({
      query: groq`*[_type == "post" ${filters}]  | order(${orderBy}) [${page}...${perPage}]{
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
        image,
      },
      categories[]->{
        title,
        description
      }
    }`,
      tags: ['posts'],
      ...params,
    });
    return posts.map((post) => {
      const date = formatDateTime(post.publishedAt) || '';
      const readingTime = formatReadingTime(post.body);

      const bodyText = toPlainText(post.body);
      let description = bodyText.replaceAll('\n', ' ');
      description = truncate(description, {
        length: 100,
        separator: /,? +/,
      });

      return {
        ...post,
        date,
        readingTime,
        description,
      };
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export { getPosts };
