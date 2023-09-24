import React from "react";

// Import library from react redux
import { useSelector, useDispatch } from "react-redux";

// Import tailwind css
import "../../../index.css";

// Import translation
import { useTranslation } from "react-i18next";
import i18n from "i18next";
//Import components
import { MainButton } from "../../../components/button";
import Header from "../../../components/header";
import { Footer } from "../../../components/footer";
import SearchBar from "../../../components/searchBar";
export default function Login() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-column flex-1">
            <Header />
            <div className="w-200 shrink-0">
                {" "}
                <SearchBar />
            </div>

            <Footer />
        </div>
    );
}
