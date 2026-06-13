module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      letterSpacing: {
        tight: '-0.5px',
      },
      colors: {
        'primary-50':  '#f3fdfc',
        'primary-100': '#dbf8f7',
        'primary-200': '#c9f4f3',
        'primary-300': '#b1f0ed',
        'primary-400': '#a1ede9',
        'primary-500': '#8ae8e4',
        'primary-600': '#7ed3cf',
        'primary-700': '#62a5a2',
        'primary-800': '#4c807d',
        'primary-900': '#3a6160',

        'secondary-50':  '#f7fef9',
        'secondary-100': '#e7fded',
        'secondary-200': '#dbfce4',
        'secondary-300': '#cbfad8',
        'secondary-400': '#c1f9d1',
        'secondary-500': '#b1f8c5',
        'secondary-600': '#a1e2b3',
        'secondary-700': '#7eb08c',
        'secondary-800': '#61886c',
        'secondary-900': '#4a6853',

        'error-600':   '#de3226',

        'warning-200': '#f9d392',
        'warning-500': '#f1a013',

        'success-300': '#80cc60',
        'success-600': '#3ca30f',

        'info-600':    '#2477e8',
        'info-700':    '#1c5db5',

        'neutral-50':  '#fafafa',
        'neutral-100': '#f1f1f1',
        'neutral-200': '#eaeaea',
        'neutral-300': '#e0e0e0',
        'neutral-600': '#bebebe',
        'neutral-700': '#949494',
        'neutral-800': '#737373',
        'neutral-900': '#585858',
      },
    },
  },
  plugins: [],
}
