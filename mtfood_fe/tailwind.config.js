import { ServerOffIcon } from "lucide-react";

/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
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
                "rich-black": "#03071eff",
                "chocolate-cosmos": "#370617ff",
                rosewood: "#6a040fff",
                "penn-red": "#9d0208ff",
                "engineering-orange": "#d00000ff",
                sinopia: "#dc2f02ff",
                persimmon: "#e85d04ff",
                "princeton-orange": "#f48c06ff",
                "orange-web": "#faa307ff",
                "selective-yellow": "#ffba08ff",
                "forest-green": "#4d8b31ff",
                error: "#B00020",

                "light-pink": "#F8F3F0",
            },
            fontFamily: {
                sans: ["Nunito", "sans-serif", ...defaultTheme.fontFamily.sans],
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
                saleBadge:
                    "url('//bizweb.dktcdn.net/100/491/159/themes/915419/assets/icon_giamgia.png?1699001498002')",
                sale: "url(//bizweb.dktcdn.net/100/491/159/themes/915419/assets/bg_flash_sale.jpg?1699002238658)",
            },
        },
    },
    plugins: [],
};
