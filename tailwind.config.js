/** @type {import('tailwindcss').Config} */

module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		screens: {
			xs: "390px",
			sm: "640px",
			md: "768px",
			lg: "1280px",
			xl: "1440px",
			"2xl": "1536px",
		},
		extend: {
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					1: "hsl(var(--chart-1))",
					2: "hsl(var(--chart-2))",
					3: "hsl(var(--chart-3))",
					4: "hsl(var(--chart-4))",
					5: "hsl(var(--chart-5))",
				},
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			fontFamily: {
				primary: ["Poppins", "sans-serif"],
				price: ["AirbnbCerealBold", "sans-serif"],
				khat: ["Khat", "sans-serif"],
				gotham: ["Gotham", "sans-serif"],
				header: ["PlayfairDisplay", "serif"],
				reenie: ["ReenieBeanie", "cursive"],
				satoshi: ["SatoshiFont", "sans-serif"],
			},
			backgroundImage: {
				"custom-gradient": "linear-gradient(145deg, #cacaca, #f0f0f0)",
			},
			boxShadow: {
				"custom-shadow": "5px 5px 15px #b3b3b3, -5px -5px 15px #ffffff",
				"custom-orange": "14px 11px 0px 0px rgba(249, 115, 22, 1)",
			},
			transitionTimingFunction: {
				"minor-spring": "cubic-bezier(0.18,0.89,0.82,1.04)",
			},
			keyframes: {
				"reveal-up": {
					"0%": { opacity: "0", transform: "translateY(80%)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"reveal-down": {
					"0%": { opacity: "0", transform: "translateY(-80%)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"content-blur": {
					"0%": { filter: "blur(0.3rem)" },
					"100%": { filter: "blur(0)" },
				},
				shine: {
					"0%": { "background-position": "100%" },
					"100%": { "background-position": "-100%" },
				},
				slideInLeft: {
					"0%": { transform: "translateX(-100%)", opacity: 0 },
					"100%": { transform: "translateX(0)", opacity: 1 },
				},
				fadeUp: {
					"0%": { opacity: "0", transform: "translateY(30px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
			},
			animation: {
				shine: "shine 5s linear infinite",
				slideInLeft: "slideInLeft 1s ease-in-out",
				fadeUp: "fadeUp 1s ease-in-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
