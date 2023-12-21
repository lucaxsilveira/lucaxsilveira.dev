import { IPost } from '@/types/post';
import { toPlainText } from '@portabletext/react';
import type { Metadata } from 'next';

import { getPost } from '@/useCases/posts/get-post';
import { getPostPaths } from '@/useCases/posts/get-post-paths';

import { isEmpty, truncate } from 'lodash';

import MorePosts from '@/components/MorePosts';
import Post from '@/components/Post';
import Tag from '@/components/Tag';
import { urlForImage } from '@/utils/image-builder';
import './styles.css';

interface IParams {
  params: {
    slug: string;
  };
}

export const dynamic = 'force-dynamic';

const PostPage = async ({ params: { slug } }: IParams) => {
  const post: IPost = await getPost({ slug });

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="post-page w-full p-4 md:max-w-[680px] md:p-0">
        <Post.Root>
          <Post.Title title={post.title} />
          <Post.Subtitle subtitle={post.subtitle || ''} />
          <div className="my-6 flex items-center justify-between border-b border-gray-200 pb-2">
            <Post.Header
              readingTime={post.readingTime}
              date={post.date}
              author={post.author}
            />
            <Post.Share />
          </div>
          <div className="font-serif">
            <Post.Content post={post} />
          </div>
          <div className="flex gap-2">
            {post.categories?.map((category) => (
              <Tag key={category.title}>{category.title}</Tag>
            ))}
          </div>
        </Post.Root>
      </div>
      <MorePosts />
    </div>
  );
};

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
  const { slug } = params;
  const { title, body, mainImage }: IPost = await getPost({ slug });

  let images: any = [];

  if (!isEmpty(mainImage) && mainImage) {
    const imageUrl = urlForImage(mainImage)
      .width(400)
      .fit('max')
      .auto('format')
      .url();
    images = [imageUrl];
  }

  const bodyText = body ? toPlainText(body) : '';
  let description = bodyText.replaceAll('\n', ' ');
  description = truncate(description, {
    length: 150,
    separator: /,? +/,
  });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [...images],
    },
  };
}

export function generateStaticParams() {
  return getPostPaths();
}

export default PostPage;