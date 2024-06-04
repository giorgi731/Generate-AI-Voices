const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,jsx,js}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      fontFamily: {
        custom: ['var(--font-custom)', 'Inter','SF Pro Text','system-ui',],
        system: ['var(--font-system)', 'Inter','SF Pro Text','system-ui',],
        serif: ['serif'],
        heading: [
          'var(--font-family-heading)',
          'Inter',
          'SF Pro Text',
          'system-ui',
        ],
        sans: ['var(--font-family-sans)'],
        monospace: [`SF Mono`, `ui-monospace`, `Monaco`, 'Monospace'],
      },
      colors: {
        black: {
          50: '#525252',
          100: '#424242',
          200: '#363636',
          300: '#282828',
          400: '#222',
          500: '#141414',
          600: '#0a0a0a',
          700: '#000',
        },
        'revocalize': {
          '50': '#ffffff',
          '100': '#fefaff',
          '150': '#fef7ff',
          '200': '#f8d8fd',
          '250': '#f5c7fd',
          '300': '#eaa1fc',
          '400': '#de6bfa',
          '500': '#d43dfa',
          '600': '#ca19fa',
          '700': '#ae14fa',
          '800': '#8107df',
          '900': '#5407ab',
          '950': '#0a0118',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          contrast: '#fff',
          ...colors.fuchsia,
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        "accent-bg": {
          DEFAULT: "hsl(var(--accent-bg))",
          foreground: "hsl(var(--accent-bg-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'gradient-radial-transparent': 'radial-gradient(var(--gradient-transparent-color-stops))',
        'gradient-radial': 'radial-gradient(var(--gradient-color-stops))',
        'gradient-gray': 'linear-gradient(90deg, rgba(255, 97, 137, 0.00) 0%, #FFF 52.48%, rgba(255, 97, 137, 0.00) 100%)',
        'gradient-light-gray': 'linear-gradient(to right, rgba(120, 120, 120, 0), rgba(120, 120, 120, 1))'
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "hue-rotate": {
          from: { filter: "hue-rotate(0deg) saturate(1.7)" },
          to: { filter: "hue-rotate(-50deg) saturate(1.7)" }
        },
        disco: {
          '0%': { transform: 'translateY(-50%) rotate(0deg)' },
          '100%': { transform: 'translateY(-50%) rotate(360deg)' },
        },
        movex: {
          from: {
            left: '0',
            opacity: '0',
          },
          '25%': {
            opacity: '1',
          },
          "50%": {
            left: '100%',
            opacity: '0',
          },
          to: {
            left: '100%',
            opacity: '0',
          },
        },
        movey: {
          from: {
            top: '0',
            opacity: '0',
          },
          '25%': {
            opacity: '1',
          },
          "50%": {
            top: '100%',
            opacity: '0',
          },
          to: {
            top: '100%',
            opacity: '0',
          },
        },
        cuberotate: {
          '0%': { transform: 'rotateX(0deg)' },
          '20%,25% ': { transform: ' rotateX(90deg)' },
          '45%,50%': { transform: 'rotateX(180deg)' },
          '70%,75% ': { transform: 'rotateX(270deg)' },
          '95%,100%': { transform: 'rotateX(360deg)' },
        },
        shimmer: {
          '100%': {transform: 'translateX(100%)',},
        },
        endless: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-245px)' }
        },
        "animate-gradient": {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "hue-rotate": "hue-rotate 4s linear infinite alternate",
        disco: 'disco 1.5s linear infinite',
        movex: 'movex 3s infinite',
        movey: 'movey 3s infinite',
        cube: 'cuberotate 8s ease-in-out infinite 4s',
        endless: 'endless 20s linear infinite',
        shimmer: 'shimmer 1s infinite',
        "animate-gradient": 'animate-gradient 1s ease infinite',
      },
    },
    plugins: [
      require("tailwindcss-animate"),
      // require('@tailwindcss/forms'),
      plugin(({ matchUtilities, theme }) => {
        matchUtilities(
          {
            'animation-delay': (value) => {
              return {
                'animation-delay': value,
              }
            },
          },
          {
            values: theme('transitionDelay'),
          }
        )
      }),
    ],
  },
};
