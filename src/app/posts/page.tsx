import { getPosts } from '@/useCases/posts/get-posts';

const Posts = async () => {
  const posts = await getPosts({ page: 0, perPage: 1 });

  return (
    <>
      <ul className="mb-10 list-disc">
        {posts.map((post) => (
          <li key={post.slug.current}>
            <a
              href={`/posts/${post.slug.current}`}
              className=" text-blue-700 underline"
            >
              {post.title}
            </a>
          </li>
        ))}
      </ul>
      <pre>{JSON.stringify(posts, null, 2)}</pre>;
    </>
  );
};

export default Posts;
