import classes from '@/utils/classes';
import React from 'react';

interface IInputMessage {
  children: React.ReactNode;
  error?: boolean;
}

const InputMessage = ({ children, error = false }: IInputMessage) => {
  return (
    <p
      role="alert"
      className={classes('mt-2 text-xs', {
        'text-pink-300': !!error,
        'text-green-600': !error,
      })}
    >
      {children}
    </p>
  );
};

export default InputMessage;
