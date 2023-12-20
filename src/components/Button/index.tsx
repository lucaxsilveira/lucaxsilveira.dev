import { CheckCircle, Loader2 } from 'lucide-react';
import { ComponentProps } from 'react';
import { VariantProps } from 'tailwind-variants';

import { variants } from './variants';

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof variants> & {
    loading?: boolean;
    children: React.ReactNode;
  };

const Button: React.FC<ButtonProps> = ({
  size,
  color,
  className,
  success = false,
  loading = false,
  children,
  ...props
}) => {
  const { icon, base, loader } = variants({ color, success, size, className });

  return (
    <button
      {...props}
      data-ripple-light="true"
      data-success={success}
      className={base()}
    >
      {success && <CheckCircle className={icon()} />}
      {loading && <Loader2 className={loader()} />}

      {children}
    </button>
  );
};

export default Button;
