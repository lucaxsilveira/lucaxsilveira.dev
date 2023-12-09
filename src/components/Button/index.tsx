import { CheckCircle } from 'lucide-react';
import { ComponentProps } from 'react';
import { VariantProps } from 'tailwind-variants';

import { variants } from './variants';

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof variants> & {};

const Button = ({
  size,
  color,
  className,
  success = false,
  ...props
}: ButtonProps) => {
  const { icon, base } = variants({ color, success, size, className });

  return (
    <button
      {...props}
      data-ripple-light="true"
      data-success={success}
      className={base()}
    >
      {success ? <CheckCircle className={icon()} /> : props.children}
    </button>
  );
};

export default Button;
