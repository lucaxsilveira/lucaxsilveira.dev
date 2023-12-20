import { ReactNode } from 'react';

interface IInputGroupProps {
  children: ReactNode;
}
const InputGroup = ({ children }: IInputGroupProps) => {
  return (
    <div className="flex overflow-hidden rounded-md border border-gray-500 bg-transparent">
      {children}
    </div>
  );
};

export default InputGroup;
