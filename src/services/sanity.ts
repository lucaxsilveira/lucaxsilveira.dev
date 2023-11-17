// import 'server-only'

import type {QueryParams} from '@sanity/client'
import { createClient } from '@sanity/client';

const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03'
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});



const DEFAULT_PARAMS = {} as QueryParams
const DEFAULT_TAGS = [] as string[]

interface SanityFetchParams {
  query: string
  params?: QueryParams
  tags?: string[]
}

export async function sanityFetch<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  tags = DEFAULT_TAGS,
}: SanityFetchParams): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, params, {
    cache: 'force-cache',
    next: {
      //revalidate: 30, // for simple, time-based revalidation
      tags, // for tag-based revalidation
    },
  })
}

export default client;
