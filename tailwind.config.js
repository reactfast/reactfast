const headlessuiPlugin = require('@headlessui/tailwindcss')
const formsPlugin = require('@tailwindcss/forms')

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.75rem' }],
      lg: ['1.125rem', { lineHeight: '2rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['2rem', { lineHeight: '2.5rem' }],
      '4xl': ['2.5rem', { lineHeight: '3.5rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1.1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    extend: {
      colors: {
        'header-text-lightmode': '#3E3E3E',
        'header-text-darkmode': '#EEEEEE',
        'header-bg-lightmode': '#ffffff',
        'header-bg-darkmode': '#000000',
        'body-text-lightmode': '#000000',
        'body-text-darkmode': '#ffffff',
        'body-bg-lightmode': '#EEEEEE',
        'body-bg-darkmode': '#3E3E3E',
        primary: '#020DF9', // or '#ff5e00'
        secondary: '#ec8200', // or '#ffed4a'
        tertiary: '#ceff1f',
        quaternary: '#D5E743',
        quinary: '#353540',
        base: '#FFFDEA',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontFamily: {
        body: 'var(--font-inter)',
        sansa: 'var(--font-inter)',
        display: 'var(--font-lexend)',
        'cherry-bomb': ['"Cherry Bomb One"', 'cursive'], // new entry
      },
      maxWidth: {
        '2xl': '40rem',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite linear',
      },
    },
  },
  plugins: [formsPlugin, headlessuiPlugin],
}
