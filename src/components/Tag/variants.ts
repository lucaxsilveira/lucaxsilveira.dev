import { tv } from 'tailwind-variants';

export const variants = tv({
  base: 'rounded-3xl text-sm font-light',
  variants: {
    size: {
      default: 'p-2 px-4',
      sm: 'p-1 px-3',
      xs: 'p-1 px-2 text-xs',
    },
    color: {
      default: 'bg-gray-200 text-slate-800',
      secondary: 'bg-sky-400/10 text-sky-300',
    },
  },
  defaultVariants: {
    size: 'default',
    color: 'default',
  },
  slots: {
    icon: 'h-4 w-4',
  },
});
