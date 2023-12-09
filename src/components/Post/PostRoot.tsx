import React from 'react';

interface PostRootProps {
  children: React.ReactNode;
}
const PostRoot = ({ children }: PostRootProps) => {
  return <div className="post">{children}</div>;
};

export default PostRoot;
