interface PostTitleProps {
  title: string;
}

const PostTitle = ({ title }: PostTitleProps) => {
  return (
    <h1 className="post__title text-2xl font-bold sm:text-3xl">{title}</h1>
  );
};

export default PostTitle;
