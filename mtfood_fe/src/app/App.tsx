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

//import loading screen
import LoadingScreen from "../components/loading.tsx";
// init translation
i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ["en", "vn"],
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
            <Provider store={store}>
                <Suspense fallback={<LoadingScreen />}>
                    <RouterProvider router={router} />
                </Suspense>
            </Provider>
        </React.StrictMode>
    );
}

export default App;
