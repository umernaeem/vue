/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary": "#1f3165",
        "secondary": "#ffca00"
      }
    },
    fontFamily:{
		Roboto: ["Roboto, sans-serif"],
    },
	container: {
		padding: "2rem",
		center: true,
	},
	screens:{
		sm: "768px",
		md: "1024px",
	}
  },
  plugins: [],
}

