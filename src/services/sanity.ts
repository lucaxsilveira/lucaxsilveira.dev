import type { QueryParams } from '@sanity/client';

import { client } from '../../sanity/lib/client';

const DEFAULT_PARAMS = {} as QueryParams;
const DEFAULT_TAGS = [] as string[];

interface SanityFetchParams {
  query: string;
  tags?: string[];
  params?: QueryParams;
  next?: NextFetchRequestConfig;
}

export async function sanityFetch<QueryResponse>({
  query,
  next,
  params = DEFAULT_PARAMS,
  tags = DEFAULT_TAGS,
}: SanityFetchParams): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, params, {
    cache: 'force-cache',
    next: {
      //revalidate: 30, // for simple, time-based revalidation
      tags, // for tag-based revalidation
      ...next,
    },
  });
}

export default client;
