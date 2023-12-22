import React from 'react';
import { twMerge } from 'tailwind-merge';

interface IGradientText extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className: string;
}

const GradientText: React.FC<IGradientText> = ({ children, className }) => {
  return (
    <h1
      className={twMerge(
        'inline select-none bg-gradient-to-r from-10% to-90% bg-clip-text text-4xl font-bold md:text-5xl',
        className,
      )}
    >
      {children}
    </h1>
  );
};

export default GradientText;
