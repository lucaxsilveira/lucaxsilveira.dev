import { tv } from 'tailwind-variants';

export const variants = tv({
  base: 'rounded-3xl bg-gray-200  text-sm font-light text-slate-800',
  variants: {
    size: {
      default: 'p-2 px-4',
      sm: 'p-1 px-3',
      xs: 'p-1 px-2 text-xs',
    },
  },
  defaultVariants: {
    size: 'default',
  },
  slots: {
    icon: 'h-4 w-4',
  },
});
