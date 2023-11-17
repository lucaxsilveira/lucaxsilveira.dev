import client, { sanityFetch } from "@/services/sanity";
import { Post } from "@/types/post";
import { getPosts } from "@/useCases/posts/get-posts";

const Home = ({ posts }: { posts: Post[] }) => {
    return <pre>{JSON.stringify(posts, null, 2)}</pre>;
};

export async function getStaticProps() {
    const posts = await getPosts();
    return {
        props: { posts },
    };
}

export default Home;
