import { ReactNode } from 'react';

import { twMerge } from 'tailwind-merge';

interface IInputProps {
  children: ReactNode;
  className?: string;
}
const InputRoot = ({ children, className, ...props }: IInputProps) => {
  return (
    <div className={twMerge('w-full', className)} {...props}>
      {children}
    </div>
  );
};

export default InputRoot;
