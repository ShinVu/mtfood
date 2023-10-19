/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary_main: "#333333",
                primary_light: "#47AD9780",
                white: "#fff",
                black: "#000",
                dark_blue: "#2A353D",
                gray: {
                    100: "#959595",
                    200: "#808080",
                    light: "#95959559",
                },
                background_footer: "#FEF6F5",
                background_main: "#EFEFEF",
                red_alert: "#E63946",
                red_main: "#B73225",
                blue: "#0055AA",
                orange: {
                    light: "#FFF5EC",
                    heavy: "#FD820A",
                },
            },
            fontFamily: {
                montserrat: ["Montserrat", "sans-serif"],
            },
            screens: {
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
            },
            backgroundImage: {
                signUp: "url('/assets/image_15.png')",
                signIn: "url('/assets/image_14.png')",
            },
        },
    },
    plugins: [
        require("flowbite/plugin"),
        require("preline/plugin"),
        require("daisyui"),
        require("@tailwindcss/line-clamp"),
    ],
};
