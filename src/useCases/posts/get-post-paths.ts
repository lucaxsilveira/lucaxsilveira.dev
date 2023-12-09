import { ISlug } from '@/types/slug';
import { sanityFetch } from '@/services/sanity';
import groq from 'groq';

type Param = {
  params: {
    slug: string;
  };
};

type QueryResponse = {
  slug: ISlug;
};

export const getPostPaths = async (): Promise<Param[]> => {
  try {
    const slugs = await sanityFetch<QueryResponse[]>({
      query: groq`*[_type == "post"]{
      slug
    }`,
      tags: ['posts'],
    });

    return slugs.map(({ slug }) => {
      return {
        params: {
          slug: slug.current,
        },
      };
    });
  } catch (error) {
    console.error('Get Post Paths', error);
    return [];
  }
};
