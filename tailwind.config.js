/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './assets/**/*.{vue,js,css}',
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}'
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%': { opacity: '1', transform: 'scale(0.8)' },
          '100%': { opacity: '0', transform: 'scale(2)' }
        },
        fadein: {
          '0%': { opacity: '0' },
          '100%': { opacity: '0.9' }
        },
        fadeout: {
          '0%': { opacity: '0.9' },
          '100%': { opacity: '0' }
        }
      },
      animation: {
        wave: 'wave 3s linear infinite',
        pulse: 'pulse 3s ease infinite',
        borderColor: 'borderColor 2x linear infinite',
        fadein: 'fadein 1s ease-in-out',
        fadeout: 'fadeout 1s ease-in-out'
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    colors: {
      current: 'currentColor',
      transparent: 'transparent',

      black: '#000',
      white: '#fff',

      primary: '$CMS_VALUE(ps_primaryColor, default: "")$',
      secondary: '$CMS_VALUE(ps_secondaryColor, default: "")$',
      text: '#4b5563',
      link: {
        text: '$CMS_VALUE(ps_linkColor, default: "")$',
        hover: '$CMS_VALUE(ps_linkHoverColor, default: "")$'
      },
      'fs-hover-bg': {
        200: '#f3f3f3'
      },
      'fs-button-bg': {
        800: '#3288c3',
        900: '#48436e'
      },
      magenta: {
        500: '#B61F7E'
      },
      darkCoolGray: {
        50: '#F5F6F7',
        100: '#EBEDEF',
        200: '#CED1D6',
        300: '#B0B5BD',
        400: '#757E8C',
        500: '#3A475B',
        600: '#344052',
        700: '#2C3544',
        800: '#232B37',
        900: '#1C232D'
      },
      coolGray: {
        50: '#F7F8F9',
        100: '#EEF0F3',
        200: '#D5DAE1',
        300: '#BBC3CF',
        400: '#8896AB',
        500: '#556987',
        600: '#4D5F7A',
        700: '#404F65',
        800: '#333F51',
        900: '#00395A'
      },
      indigo: {
        50: '#F8F6FF',
        100: '#F0EEFF',
        200: '#DAD4FF',
        300: '#C3B9FF',
        400: '#9685FF',
        500: '#6951FF',
        600: '#5F49E6',
        700: '#4F3DBF',
        800: '#3F3199',
        900: '#33287D'
      },
      violet: {
        50: '#FBF7FF',
        100: '#F6EEFE',
        200: '#E9D5FD',
        300: '#DCBBFC',
        400: '#C288F9',
        500: '#A855F7',
        600: '#974DDE',
        700: '#7E40B9',
        800: '#653394',
        900: '#522A79'
      },
      yellow: {
        50: '#FFFAF3',
        100: '#FEF5E7',
        200: '#FDE7C2',
        300: '#FBD89D',
        400: '#F8BB54',
        500: '#F59E0B',
        600: '#DD8E0A',
        700: '#B87708',
        800: '#935F07',
        900: '#784D05'
      },
      red: {
        50: '#FEF7F6',
        100: '#FDEEEC',
        200: '#FBD6D0',
        300: '#F9BDB4',
        400: '#F48B7C',
        500: '#EF5844',
        600: '#D7503D',
        700: '#B34333',
        800: '#8F3529',
        900: '#752C21'
      },
      green: {
        50: '#F4FDF7',
        100: '#EAFAF0',
        200: '#CAF4D9',
        300: '#AAEDC3',
        400: '#6ADF95',
        500: '#3dd174',
        600: '#26BC5E',
        700: '#209D4E',
        800: '#197D3E',
        900: '#156633'
      },
      blue: {
        50: '#F5F9FF',
        100: '#EBF3FE',
        200: '#CEE0FD',
        300: '#B1CDFB',
        400: '#76A8F9',
        500: '#3B82F6',
        600: '#3575DD',
        700: '#2C62B9',
        800: '#234E94',
        900: '#1D4079'
      },
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#00395A'
      }
    },
    spacing: {
      px: '1px',
      0: '0px',
      0.5: '0.125rem',
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.625rem',
      3: '0.75rem',
      3.5: '0.875rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      11: '2.75rem',
      12: '3rem',
      14: '3.5rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      44: '11rem',
      48: '12rem',
      52: '13rem',
      56: '14rem',
      60: '15rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      96: '24rem'
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
      body: '#fff'
    }),
    backgroundPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top'
    },
    borderColor: (theme) => ({
      ...theme('colors'),
      DEFAULT: '#e5e7eb'
    }),
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.675rem',
      '2xl': '0.75rem',
      '3xl': '0.875rem',
      '4xl': '1rem',
      '5xl': '1.25rem',
      '6xl': '1.375rem',
      '7xl': '1.5rem',
      '8xl': '2rem',
      '9xl': '2.25rem',
      '10xl': '2.5rem',
      '11xl': '5rem',
      full: '9999px'
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      2: '2px',
      4: '4px',
      8: '8px'
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(105, 81, 255, 0.05)',
      DEFAULT:
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 1px 2px 0 rgba(85, 105, 135, 0.1)',
      lg: '0px 1px 3px rgba(42, 51, 66, 0.06)',
      xl: '10px 14px 34px rgba(0, 0, 0, 0.04)',
      '2xl': '0px 32px 64px -12px rgba(85, 105, 135, 0.08)',
      '3xl': '0px 24px 48px -12px rgba(42, 51, 66, 0.06)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none'
    },
    container: {},
    cursor: {
      auto: 'auto',
      DEFAULT: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      'not-allowed': 'not-allowed'
    },
    fill: {
      current: 'currentColor'
    },
    flex: {
      1: '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      none: 'none'
    },
    flexGrow: {
      0: '0',
      DEFAULT: '1'
    },
    flexShrink: {
      0: '0',
      DEFAULT: '1'
    },
    fontFamily: {
      body: '"Poppins", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      heading:
        '"Poppins", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      sans: '"Poppins", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
    },
    fontSize: {
      xxs: '0.6875rem',
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem'
    },
    fontWeight: {
      hairline: '100',
      thin: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    },
    height: (theme) => ({
      auto: 'auto',
      ...theme('spacing'),
      full: '100%',
      screen: '100vh'
    }),
    inset: (theme, { negative }) => ({
      auto: 'auto',
      ...theme('spacing'),
      ...negative(theme('spacing')),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      full: '100%',
      '-1/2': '-50%',
      '-1/3': '-33.333333%',
      '-2/3': '-66.666667%',
      '-1/4': '-25%',
      '-2/4': '-50%',
      '-3/4': '-75%',
      '-full': '-100%'
    }),
    letterSpacing: {
      tighter: '-0.02em',
      tight: '-1px',
      normal: '0em',
      wide: '0.03em',
      wider: '0.08em',
      widest: '0.1em'
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
      3: '.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem'
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal'
    },
    margin: (theme, { negative }) => ({
      auto: 'auto',
      ...theme('spacing'),
      ...negative(theme('spacing'))
    }),
    // maxHeight, maxWidth, minHeight, minWidth
    objectPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top'
    },
    opacity: {
      0: '0',
      5: '0.05',
      10: '0.1',
      20: '0.2',
      25: '0.25',
      30: '0.3',
      40: '0.4',
      50: '0.5',
      60: '0.6',
      70: '0.7',
      75: '0.75',
      80: '0.8',
      90: '0.9',
      95: '0.95',
      100: '1'
    },
    order: {
      first: '-9999',
      last: '9999',
      none: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12'
    },
    padding: (theme) => theme('spacing'),
    placeholderColor: (theme) => theme('colors'),
    stroke: (theme) => ({
      ...theme('colors'),
      current: 'currentColor'
    }),
    textColor: (theme) => ({
      ...theme('colors'),
      body: '#2A3342'
    }),
    width: (theme) => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
      full: '100%',
      screen: '100vw'
    }),
    zIndex: {
      auto: 'auto',
      0: '0',
      10: '10',
      20: '20',
      30: '30',
      40: '40',
      50: '50'
    }
  },
  plugins: []
}
