import { HTMLProps, forwardRef } from 'react';

interface IInputProps extends HTMLProps<HTMLInputElement> {}

const Input = forwardRef(
  ({ ...rest }: IInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
      <input
        {...rest}
        ref={ref}
        className="min-h-[40px] w-full bg-transparent pl-2 outline-none"
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;
