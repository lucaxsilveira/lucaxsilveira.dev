import { IPost } from '@/types/post';
import { portableTextComponents } from '@/utils/portable-text-components';
import { PortableText } from '@portabletext/react';

interface PostContentProps {
  post: IPost;
}

const PostContent = ({ post }: PostContentProps) => {
  return (
    <div className="post__content">
      <PortableText
        value={post.body}
        onMissingComponent={(message, options) => {
          console.log('message', message);
          console.log('options', options);
        }}
        components={portableTextComponents}
      />
    </div>
  );
};

export default PostContent;
