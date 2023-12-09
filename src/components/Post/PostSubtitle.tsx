interface PostSubtitleProps {
  subtitle: string;
}

const PostSubtitle = ({ subtitle }: PostSubtitleProps) => {
  return (
    <h2 className="post__subtitle text-xl font-light text-gray-600">
      {subtitle}
    </h2>
  );
};

export default PostSubtitle;
