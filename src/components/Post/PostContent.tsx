import { IPost } from '@/types/post';

import Text from '../Text';

interface PostContentProps {
  post: IPost;
}

const PostContent = ({ post }: PostContentProps) => {
  return (
    <div className="post__content">
      <Text value={post.body} />
    </div>
  );
};

export default PostContent;
