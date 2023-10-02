import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Footer } from "../components/footer";
import Header from "../components/header";
import { useParams } from "react-router-dom";
export default function ProductDetails() {
    const { t } = useTranslation();
    const {id} = useParams();
    return (
        <div className="flex flex-1 flex-col">
            <Header/>
            <div className="flex flex-1 p-4">
                <p className="text-xs font-bold">{t("home")} {">"} {t("product")} {">"}</p> 
            </div>
            <Footer/>
        </div>
    )
}