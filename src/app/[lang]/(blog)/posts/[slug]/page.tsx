import type { Metadata } from 'next';

import MorePosts from '@/components/MorePosts';
import Post from '@/components/Post';
import Tag from '@/components/Tag';

import { IPost } from '@/types/post';

import { getPost } from '@/useCases/posts/get-post';
import { getPostPaths } from '@/useCases/posts/get-post-paths';
import { LocaleNames } from '@/utils/language';
import { generatePageMetadata } from '@/utils/metadata';

import './styles.css';

interface IParams {
  params: {
    slug: string;
    lang: LocaleNames;
  };
}

export const dynamic = 'force-dynamic';

const PostPage = async ({ params: { slug, lang } }: IParams) => {
  const post: IPost = await getPost({ slug, lang });

  return (
    <div className="flex w-full flex-col items-center justify-center pt-[90px]">
      <div className="post-page w-full p-4 md:max-w-[680px] md:p-0">
        <Post.Root>
          <Post.Title title={post.title} />
          <Post.Subtitle subtitle={post.subtitle || ''} />
          <div className="my-6 flex items-center justify-between border-b border-gray-200 pb-2">
            <Post.Header
              lang={lang}
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
      <MorePosts lang={lang} />
    </div>
  );
};

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
  const { slug, lang } = params;
  const {
    title,
    body: description,
    mainImage: image,
  }: IPost = await getPost({ slug, lang });

  return generatePageMetadata({ title, description, image });
}

export function generateStaticParams() {
  return getPostPaths();
}

export default PostPage;
