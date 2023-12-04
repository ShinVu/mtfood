// Import react library
import { useState } from "react";

// Import tailwind css
import { useSelector } from "react-redux";
import "../index.css";

// Import translation
import { useTranslation } from "react-i18next";

//Import icon
import { FaAngleDown } from "react-icons/fa6";

//Import color theme
import { colors } from "../../public/theme";

//Import Element
import SearchBar from "./searchBar";

//Import type
import { lang } from "../models/lang.model";
import { useLocation, useNavigate } from "react-router-dom";
import LanguagePopper from "./languagePopper";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import axiosClient from "../../axios-client";
import {
    logOutFailResponse,
    logOutSuccessResponse,
} from "../models/user.model";
import {
    handleLogInDialogOpen,
    signOut,
} from "../features/authentication/authenticationSlice";
export default function HeaderCheckout() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    //Redux
    const { user, token } = useAppSelector((state) => state.authentication);
    const { productCart } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();
    const logOut = () => {
        const payload = {
            id: user.id,
        };
        axiosClient
            .post("/logout", payload)
            .then(({ data }: { data: logOutSuccessResponse }) => {
                dispatch(signOut(null));
                navigate("/home");
            })
            .catch(({ response }: { response: logOutFailResponse }) => {
                console.log(response.data.message);
            });
    };

    const handleNavigateMustLogin = (navigateRoute: string) => {
        if (!token) {
            dispatch(handleLogInDialogOpen());
        } else {
            navigate(navigateRoute);
        }
    };

    return (
        <div className="flex flex-col bg-primary_main">
            <div className="flex flex-row grow items-center justify-between p-2">
                <div className="flex flex-col md:flex-row md:items-center  ">
                    <p className="font-medium text-xs text-white capitalize  my-0 mx-2">
                        {t("hotline")}:{" "}
                        <span className="font-bold">096 321 9191</span>
                    </p>
                    <p className=" font-medium text-xs text-white capitalize my-0 mx-2">
                        {t("address")}:{" "}
                        <span className="font-bold">
                            285/21 Cách Mạng Tháng 8, Phường 12, Quận 10, TP. Hồ
                            Chí Minh
                        </span>{" "}
                    </p>
                </div>
                <div className="flex flex-row items-center">
                    {user ? (
                        <p className=" font-medium text-xs text-white capitalize my-0 mx-1 space-x-4">
                            {t("hello")},{" "}
                            <span
                                className="font-bold cursor-pointer"
                                onClick={() =>
                                    handleNavigateMustLogin("/user/account")
                                }
                            >
                                {user.name
                                    ? user.name
                                    : user.email
                                    ? user.email
                                    : user.phoneNumber}
                            </span>
                            <span
                                className="cursor-pointer uppercase"
                                onClick={() => logOut()}
                            >
                                {t("logout")}
                            </span>
                        </p>
                    ) : (
                        <div className="flex flex-row items-center">
                            <p
                                className=" font-bold text-xs text-white capitalize my-0 mx-1 cursor-pointer"
                                onClick={() => navigate("/login")}
                            >
                                {t("login")}
                            </p>

                            <Button className="bg-orange-web font-bold text-xs text-white capitalize my-0 mx-1 cursor-pointer">
                                {t("signup")}
                            </Button>
                        </div>
                    )}
                    <LanguagePopper />
                </div>
            </div>

            <div className="flex flex-1 items-center justify-between my-3 px-4 ">
                <img
                    onClick={() => navigate("/home")}
                    src="/assets/logo.png"
                    alt="logo"
                    loading="lazy"
                    className="w-16 h-16 cursor-pointer"
                />
                <div className="flex self-end w-1/2">
                    <SearchBar />
                </div>
            </div>
        </div>
    );
}
