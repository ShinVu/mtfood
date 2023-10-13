import React, { useState } from "react";
import { useTranslation } from "react-i18next";
//Import MUI

//Import components
import Header from "../components/header";
import Footer from "../components/Footer";

export default function Home() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-1 flex-col">
            <Header />
            <div className="flex flex-row flex-1 w-full px-4 py-12 bg-background_main"></div>

            <Footer />
        </div>
    );
}
