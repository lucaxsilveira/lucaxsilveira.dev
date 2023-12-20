import { ReactNode } from 'react';

import { twMerge } from 'tailwind-merge';

interface IInputProps {
  children: ReactNode;
  className?: string;
}
const InputRoot = ({ children, className, ...rest }: IInputProps) => {
  return <div className={twMerge('w-full', className)}>{children}</div>;
};

export default InputRoot;
