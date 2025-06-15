/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 20px #22d3ee, 0 0 40px #22d3ee, 0 0 60px #22d3ee",
          },
          "50%": {
            boxShadow: "0 0 40px #22d3ee, 0 0 80px #22d3ee, 0 0 120px #22d3ee",
          },
        },
      },
    },
  },
  plugins: [],
};
