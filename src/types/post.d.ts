export interface Post {
  _id: string;
  title?: string;
  slug?: string;
  mainImage?: {
    asset: {
      url: string;
    };
  };
  publishedAt?: string;
  body?: any;
  author?: {
    name?: string;
    photo?: string;
    bio?: string;
    slug?: string;
  };
}
