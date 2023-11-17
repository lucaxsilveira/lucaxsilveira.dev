import type { QueryParams } from '@sanity/client';

import { sanityFetch } from '@/services/sanity';
import { Post } from '@/types/post';

interface GetPostsParams {
  params?: QueryParams;
}

const DEFAULT_PARAMS = {} as QueryParams;

const getPosts = ({
  params = DEFAULT_PARAMS,
}: GetPostsParams = {}): Promise<Post> => {
  return sanityFetch<Post>({
    query: `*[_type == "post"]`,
    tags: ['post'],
    ...params,
  });
};

export { getPosts };

// another way to write the query

// const query = `*[_type == "post"][0] {
//       title,
//       slug,
//       mainImage,
//       publishedAt,
//       body,
//       author->{
//         name,
//         "photo": image.asset->url,
//         bio,
//         slug
//       }
//     }`;
