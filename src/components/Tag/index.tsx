import { ComponentProps } from 'react';

import { VariantProps } from 'tailwind-variants';

import { variants } from './variants';

type ButtonProps = ComponentProps<'span'> & VariantProps<typeof variants> & {};

const Tag = ({ size, className, children }: ButtonProps) => {
  const { base } = variants({ size, className });

  return <span className={base()}>{children}</span>;
};

export default Tag;
