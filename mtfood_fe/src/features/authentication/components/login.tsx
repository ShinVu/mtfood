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

export default function Login() {
    const { t } = useTranslation();
    return (
        <div>
            <MainButton
                text={t("language")}
                onClick={() => i18n.changeLanguage("en")}
            />
        </div>
    );
}
