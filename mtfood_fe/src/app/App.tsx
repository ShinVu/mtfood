import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";

// import library for translation
import i18n from "i18next";
import Backend from "i18next-http-backend"; //default location public/locales/{lang}/translation.json
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
//import loading screen
import LoadingScreen from "../components/loading";

//import font for MUI
import "typeface-montserrat";

//import Engine MUI
import { StyledEngineProvider } from "@mui/material/styles";
//import MUX
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

//import Google Provider
import { GoogleOAuthProvider } from "@react-oauth/google";

//import laravel Echo
import Echo from "laravel-echo";
import Pusher from "pusher-js";
//import Swiper
// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

//Set locale to VN
import moment from "moment";
import "moment/dist/locale/vi";
import { colors } from "../../public/theme.ts";
moment.locale("vi");

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
    augmentColor({ color: { main: mainColor } });
const theme = createTheme({
    typography: {
        fontFamily: ["Nunito", "sans-serif"].join(","),
    },
    palette: {
        primary: {
            main: colors["rich-black"],
            contrastText: "#fff",
        },
        secondary: {
            main: "#B73225",
            contrastText: "#fff",
        },
    },
});
// init translation
i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ["vn", "en"],
        fallbackLng: "vn", //fallback language
        debug: true, //Change to false in production
        interpolation: { escapeValue: false }, //escapeValue has already been handled by React
        detection: {
            // detect language based on these following properties
            order: [
                "querystring",
                "cookie",
                "localStorage",
                "sessionStorage",
                "navigator",
                "htmlTag",
                "path",
                "subdomain",
            ],
            caches: ["cookie"],
        },
    });

//init laravel echo

window.Pusher = Pusher;
window.Echo = new Echo({
    broadcaster: "pusher",
    key: import.meta.env.VITE_MIX_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_MIX_PUSHER_APP_CLUSTER,

    encrypted: true,
});
window.Echo.channel("testing").listen("PublicMessageEvent", () => {});
function App() {
    return (
        // <React.StrictMode>
        <GoogleOAuthProvider clientId="557838967224-01nbpbjlmb6oinhrpohi5bj40sakjneu.apps.googleusercontent.com">
            <StyledEngineProvider injectFirst>
                <Provider store={store}>
                    <ThemeProvider theme={theme}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Suspense fallback={<LoadingScreen open={true} />}>
                                <RouterProvider router={router} />
                            </Suspense>
                        </LocalizationProvider>
                    </ThemeProvider>
                </Provider>
            </StyledEngineProvider>
        </GoogleOAuthProvider>
        // </React.StrictMode>
    );
}

export default App;
