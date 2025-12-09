import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brx: {
          blue: '#42a8d2',
          'blue-hover': '#3a95bb',
          navy: '#101236',
          dark: '#1e1f1f',
          'text-body': '#7a7a7a',
          'text-heading': '#444444',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Montserrat', 'sans-serif'],
        body: ['var(--font-body)', 'Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [
     typography,
  ],
};
export default config;