/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        // Minimalist
        'dm-sans': ['DMSans-Regular'],
        'dm-sans-bold': ['DMSans-Bold'],
        'dm-serif': ['DMSerifDisplay-Regular'],
        
        // Neo-Brutalism
        'space-mono': ['SpaceMono-Regular'],
        'space-mono-bold': ['SpaceMono-Bold'],
        'bebas': ['BebasNeue-Regular'],

        // Retro
        'vt323': ['VT323-Regular'],
        'courier': ['CourierPrime-Regular'],
        'courier-bold': ['CourierPrime-Bold'],
      },
    },
  },
  plugins: [],
}