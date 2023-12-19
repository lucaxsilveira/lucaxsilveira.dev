import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import fontSize from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layout/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/portable-text-components.tsx',
  ],
  theme: {
    fontSize: {
      ...fontSize.fontSize,
      '2xs': '.625rem',
      '3xs': '.5rem',
      '4xs': '.375rem',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        ...colors,
        primary: colors.blue[500], // sky[600],
        secondary: colors.violet[600],
        'primary-colors': colors.blue,
        'secondary-colors': colors.violet,
        backgroud: '#0e0c12',
      },
    },
  },
  plugins: [],
};

export default config;
