import { toPlainText } from '@portabletext/react';
import { truncate } from 'lodash';
import { headers } from 'next/headers';

import { IPost } from '@/types/post';
import { getPosts } from '@/useCases/posts/get-posts';

import Image from '../Image';

const MorePosts = async () => {
  const headersList = headers();
  const pathname = headersList.get('x-pathname')?.replace('/posts/', '');

  const posts: IPost[] = await getPosts({
    page: 0,
    perPage: 4,
    filters: [
      {
        field: 'slug.current',
        value: pathname || '',
        operator: '!=',
      },
    ],
    lang: 'en-US',
  });

  const getDescription = (body: any) => {
    const bodyText = toPlainText(body);
    let description = bodyText.replaceAll('\n', ' ');
    return truncate(description, {
      length: 100,
      separator: /,? +/,
    });
  };

  const getSubtitle = (subtitle: string) => {
    return truncate(subtitle, {
      length: 100,
      separator: /,? +/,
    });
  };

  return (
    <div className="more-posts flex w-full flex-col items-center justify-center bg-gray-100">
      <div className="max-w-[680px] p-4 py-8 md:min-w-[680px] md:p-0">
        <p className="mb-4 text-sm ">Você também pode gostar de:</p>
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <a href={`/posts/${post.slug.current}`} key={post.slug.current}>
              <div className="post-bullet flex w-full flex-col">
                <figure className="h-[200px] w-full">
                  <Image
                    className={'h-[200px] w-full object-cover object-center'}
                    value={post.mainImage}
                    isInline={false}
                  />
                </figure>
                <div className="mt-4">
                  <p className="text-md font-semibold">{post.title}</p>
                  <p className="mt-2 text-sm font-light text-gray-600">
                    {post.subtitle
                      ? getSubtitle(post.subtitle)
                      : getDescription(post.body)}
                  </p>
                </div>
                <div className="text-light mt-auto flex gap-2 pt-3 text-xs text-gray-400">
                  {post.date && (
                    <span className="after:top-0.3 after:relative after:ml-2 after:text-gray-500 after:content-['·'] ">
                      {post.date}
                    </span>
                  )}
                  <span>{post.readingTime && post.readingTime}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MorePosts;
