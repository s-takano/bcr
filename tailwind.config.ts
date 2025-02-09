import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'gold': {
          600: 'var(--gold-600)',     
          700: 'var(--gold-700)',
          800: 'var(--gold-800)',
        },

        // Soft taupe or cream tones for backgrounds
        'cream-taupe': '#F4EFEA',
        'warm-gray': '#D9CDC3',
        
        // A rich burgundy accent
        'accent-burgundy': '#4a1c2f',

        // Lighter burgundy or gold accent if needed
        'accent-gold': '#ab936f',
      },
      fontFamily: {
        // Make sure you import these fonts in _app.js or <Head> 
        'cormorant': ['Cormorant', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'sans': ['utile-display', 'sans-serif'],
        'serif': ['utile-display', 'serif'],
        'display': ['utile-display', 'sans-serif'],
      },
      keyframes: {
        flowLeft: {
          '0%': { transform: 'translateX(0) translateY(-50%)' },
          '100%': { transform: 'translateX(-200vw) translateY(-50%)' }
        }
      },
      animation: {
        'flowLeft': 'flowLeft 90s linear infinite'
      },
    },
  },
  plugins: [],
}

export default config;
