import Link from 'next/link';

import GradientText from '@/components/GradientText';
import Image from '@/components/Image/Image';
import Tag from '@/components/Tag';
import { getPosts } from '@/useCases/posts/get-posts';
import { getDictionary } from '@/utils/dictionaries';
import { LocaleNames } from '@/utils/language';

interface PostsProps {
  params: {
    lang: LocaleNames;
  };
}

const Posts: React.FC<PostsProps> = async ({ params: { lang } }) => {
  const posts = await getPosts({ page: 0, perPage: 10, lang });

  const dict = getDictionary(lang);

  return (
    <div className="pb-4 pt-[90px]  md:flex md:max-h-screen md:flex-col md:pt-[120px] ">
      <GradientText className="from-fuchsia-500 to-violet-700">
        {dict.posts.title}
      </GradientText>

      <div className="text-bold-white mt-4  text-gray-400">
        <p dangerouslySetInnerHTML={{ __html: dict.posts.description }}></p>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-12">
        {posts.map((post) => (
          <Link
            href={`/${lang}/posts/${post.slug.current}`}
            key={`${post.slug.current}`}
            className="block"
          >
            <div className="flex flex-col justify-center">
              <div className="mb-4 overflow-hidden rounded-lg">
                <Image value={post.mainImage} isInline={false} />
              </div>
              <div className="flex flex-row gap-16">
                <div>
                  <p className=" line-clamp-2 text-lg font-bold leading-5 text-white lg:line-clamp-none">
                    {post.title}
                  </p>
                  <p className="mt-2 text-sm font-light">{post.description}</p>
                </div>
              </div>
              <span className="mt-2 text-sm text-gray-200">
                <span className="after:top-0.3 after:relative after:ml-2 after:text-gray-500 after:content-['·'] ">
                  {post.date}
                </span>
                <span className="ml-2">{post.readingTime}</span>
              </span>
              <div className="tags mt-4 flex items-center gap-2">
                {post.categories?.map((category) => (
                  <Tag size="sm" key={category.title}>
                    {category.title}
                  </Tag>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Posts;
