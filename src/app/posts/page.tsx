import Image from '@/components/Image/Image';
import Tag from '@/components/Tag';
import Text from '@/components/Text';
import { getAuthor } from '@/useCases/authors/get-author';
import { getPosts } from '@/useCases/posts/get-posts';

const Posts = async () => {
  const posts = await getPosts({ page: 0, perPage: 10 });
  const author = await getAuthor({ slug: 'lucas' });

  return (
    <div className="flex w-full justify-center gap-12">
      <div className="post-list min-w-[728px] max-w-[728px] divide-y divide-gray-200">
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
                  <p className="text-lg font-bold leading-5">{post.title}</p>
                  <p className="mt-2 text-sm font-light">{post.description}</p>
                </div>
                <div className="max-w-[120px]">
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

      <div className="author min-w-[368px] max-w-[368px]">
        <div className="relative">
          <div className="overflow-hidden rounded-lg">
            <Image value={author.cover} isInline={false} />
          </div>
          <div className="absolute left-4 top-8 flex items-center ">
            <div className="image border-color-white  h-[80px] w-[80px] overflow-hidden rounded-[50%] border-2">
              <Image value={author.image} isInline={false} />
            </div>
            <p className="text-md ml-2 text-white">Lucas da Silveira</p>
          </div>
        </div>

        <div className="mt-8">
          <div className="mt-2 font-sans text-sm text-gray-500">
            <Text value={author.bio} useComponents={false} />
          </div>
        </div>
      </div>
      {/* <pre>{JSON.stringify(posts, null, 2)}</pre>; */}
    </div>
  );
};

export default Posts;
