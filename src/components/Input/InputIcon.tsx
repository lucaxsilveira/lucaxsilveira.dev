import React, { ReactElement } from 'react';

interface IInputLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: ReactElement;
}

const InputIcon = ({ icon, ...rest }: IInputLabelProps) => {
  return (
    <div className="flex items-center px-2 py-2" {...rest}>
      {icon}
    </div>
  );
};

export default InputIcon;
