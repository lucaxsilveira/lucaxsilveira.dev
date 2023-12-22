import Image from '@/components/Image/Image';
import Tag from '@/components/Tag';
import Text from '@/components/Text';
import { getAuthor } from '@/useCases/authors/get-author';
import { getPosts } from '@/useCases/posts/get-posts';

const Posts = async () => {
  const posts = await getPosts({ page: 0, perPage: 10, lang: 'en-US' });
  const author = await getAuthor({ slug: 'lucas', lang: 'en-US' });

  return (
    <div className="flex w-full flex-col-reverse justify-center gap-12 lg:flex-row ">
      <div className="post-list divide-y divide-gray-200 p-4 lg:min-w-[728px] lg:max-w-[728px] lg:p-0">
        {posts.map((post) => (
          <a
            href={`/posts/${post.slug.current}`}
            key={`${post.slug.current}`}
            className="block py-8 first:pt-0"
          >
            <div className="flex flex-col justify-center">
              <span className="text-muted text-sm">
                <span className="after:top-0.3 after:relative after:ml-2 after:text-gray-500 after:content-['·'] ">
                  {post.date}
                </span>
                <span className="ml-2">{post.readingTime}</span>
              </span>
              <div className="mt-2 flex flex-row gap-16">
                <div>
                  <p className="line-clamp-2 text-lg font-bold leading-5 lg:line-clamp-none">
                    {post.title}
                  </p>
                  <p className="mt-2 text-sm font-light">{post.description}</p>
                </div>
                <div className="max-w-[120px] sm:ml-auto">
                  <Image value={post.mainImage} isInline={false} />
                </div>
              </div>
              <div className="tags mt-4 flex items-center gap-2">
                {post.categories?.map((category) => (
                  <Tag size="sm" key={category.title}>
                    {category.title}
                  </Tag>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="author w-full lg:min-w-[368px] lg:max-w-[368px]">
        <div className="relative">
          <div className="max-h-[170px] overflow-hidden lg:rounded-lg">
            <Image value={author.cover} isInline={false} />
          </div>
          <div className="relative ml-4 mt-4 flex items-center lg:absolute lg:left-4 lg:top-8 lg:ml-0 lg:mt-0">
            <div className="image border-color-white h-[70px] w-[70px] overflow-hidden rounded-[50%] border-2 lg:h-[80px] lg:w-[80px]">
              <Image value={author.image} isInline={false} />
            </div>
            <p className="text-md ml-2 lg:text-white">Lucas da Silveira</p>
          </div>
        </div>

        <div className="mt-4 lg:mt-8">
          <div className="mt-2 px-4 font-sans text-sm text-gray-500 lg:p-0">
            <Text value={author.bio} useComponents={false} />
          </div>
        </div>
      </div>
      {/* <pre>{JSON.stringify(posts, null, 2)}</pre>; */}
    </div>
  );
};

export default Posts;
