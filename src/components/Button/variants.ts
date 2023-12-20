import { tv } from 'tailwind-variants';

export const variants = tv({
  base: 'shadow-md shadow-grey-300/20 hover:shadow-lg hover:shadow-grey-500/40 flex items-center justify-center rounded transition-all ',
  variants: {
    color: {
      default: 'bg-primary text-white hover:bg-primary-colors-500',
      secondary: {
        base: 'bg-secondary text-white hover:bg-secondary-colors-700',
      },
      white: 'bg-white hover:bg-gray-300 text-slate-900',
    },
    size: {
      default: 'h-10 px-4 text-sm',
      sm: {
        base: 'h-8 px-3',
        icon: 'h-3 w-3',
      },
      xs: {
        base: 'h-6 px-2',
        icon: 'h-2 w-2',
      },
    },
    success: {
      true: {
        base: 'bg-green-500 text-white hover:bg-green-600',
      },
    },
  },
  defaultVariants: {
    size: 'default',
    color: 'default',
    success: false,
  },
  slots: {
    icon: 'h-4 w-4 mr-2',
    loader: 'mr-2 animate-spin h-4 w-4',
  },
});
