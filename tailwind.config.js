/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)"],
                outfit: ["var(--font-outfit)"],
            },
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "#0066FF",
                    foreground: "#FFFFFF",
                },
                secondary: {
                    DEFAULT: "#1E293B",
                    foreground: "#F8FAFC",
                },
                accent: {
                    DEFAULT: "#10B981",
                    foreground: "#FFFFFF",
                },
                card: {
                    DEFAULT: "rgba(30, 41, 59, 0.7)",
                    foreground: "#F8FAFC",
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
            },
            backdropBlur: {
                xs: "2px",
            },
        },
    },
    plugins: [],
};
