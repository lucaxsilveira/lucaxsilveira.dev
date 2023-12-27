interface PostSubtitleProps {
  subtitle: string;
}

const PostSubtitle = ({ subtitle }: PostSubtitleProps) => {
  return (
    <h2 className="post__subtitle text-lg font-light text-gray-400 sm:text-xl">
      {subtitle}
    </h2>
  );
};

export default PostSubtitle;
