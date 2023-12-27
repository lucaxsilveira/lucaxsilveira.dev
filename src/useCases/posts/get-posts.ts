import { toPlainText } from '@portabletext/react';
import groq from 'groq';
import { truncate } from 'lodash';

import { sanityFetch } from '@/services/sanity';
import { IPost } from '@/types/post';

import { formatDateTime, formatReadingTime } from '@/utils/date';

// eslint-disable-next-line sort-imports
import { IParams, buildQueryParams } from '@/utils/sanity';

const DEFAULT_PARAMS = {} as IParams;

const getPosts = async (params = DEFAULT_PARAMS): Promise<IPost[]> => {
  try {
    let { page, perPage, orderBy, filterString, lang } =
      buildQueryParams(params);

    const expression = `language == "${lang}" && _type == "post" ${filterString}]  | order(${orderBy}) [${page}...${perPage}`;

    const posts = await sanityFetch<IPost[]>({
      query: groq`*[${expression}]{
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
      tags: ['posts'],
      ...params,
    });

    return posts.map((post) => {
      const date = formatDateTime(post.publishedAt, lang) || '';
      const readingTime = formatReadingTime(post.body, lang);

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
