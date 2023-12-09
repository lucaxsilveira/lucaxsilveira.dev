interface PostTitleProps {
  title: string;
}

const PostTitle = ({ title }: PostTitleProps) => {
  return <h1 className="post__title text-3xl font-bold">{title}</h1>;
};

export default PostTitle;
