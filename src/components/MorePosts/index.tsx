import { toPlainText } from '@portabletext/react';
import { isEmpty, truncate } from 'lodash';
import { headers } from 'next/headers';

import { IPost } from '@/types/post';
import { getPosts } from '@/useCases/posts/get-posts';

import { getDictionary } from '@/utils/dictionaries';
import { LocaleNames } from '@/utils/language';
import Image from '../Image';

interface IMorePosts {
  lang: LocaleNames;
}

const MorePosts: React.FC<IMorePosts> = async ({ lang }) => {
  const headersList = headers();
  const pathname = headersList.get('x-pathname')?.replace('/posts/', '');

  const dict = getDictionary(lang);

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
    lang,
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

  if (isEmpty(posts)) return <></>;

  return (
    <div className="more-posts flex w-full flex-col items-center justify-center bg-gray-100 py-8">
      <div className="min-w-full max-w-[680px] px-4 md:min-w-[680px] md:p-0">
        <p className="text-muted mb-4 text-sm">{dict.postPage.more}</p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <a href={`/posts/${post.slug.current}`} key={post.slug.current}>
              <div className="post-bullet flex w-full flex-col">
                <figure className="h-[250px] w-full md:h-[200px]">
                  <Image
                    className={
                      'h-[250px] w-full object-cover object-center md:h-[200px]'
                    }
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
