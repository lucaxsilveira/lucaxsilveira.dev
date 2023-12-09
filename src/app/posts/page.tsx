import { IPost } from '@/types/post';
import { getPosts } from '@/useCases/posts/get-posts';

interface IPostsProps {
  posts: IPost[];
  children?: React.ReactNode;
}

import { IReactChildren } from '@/types/react';

const Posts = async ({ children }: IReactChildren) => {
  const posts = await getPosts();

  return <pre>{JSON.stringify(posts, null, 2)}</pre>;
};

export default Posts;
