import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
import { Provider } from "react-redux";
import store from "./store.ts";

// import library for translation
import i18n from "i18next";
import Backend from "i18next-http-backend"; //default location public/locales/{lang}/translation.json
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
//import loading screen
import LoadingScreen from "../components/Loading.js";

//import font for MUI
import "typeface-montserrat";

//import MUX
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

//import Google Provider
import { GoogleOAuthProvider } from "@react-oauth/google";

//import Swiper
// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
    augmentColor({ color: { main: mainColor } });
const theme = createTheme({
    typography: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
    palette: {
        primary: {
            main: "#47AD97",
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

function App() {
    return (
        <React.StrictMode>
            <GoogleOAuthProvider clientId="557838967224-01nbpbjlmb6oinhrpohi5bj40sakjneu.apps.googleusercontent.com">
                <Provider store={store}>
                    <ThemeProvider theme={theme}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Suspense fallback={<LoadingScreen />}>
                                <RouterProvider router={router} />
                            </Suspense>
                        </LocalizationProvider>
                    </ThemeProvider>
                </Provider>
            </GoogleOAuthProvider>
        </React.StrictMode>
    );
}

export default App;
