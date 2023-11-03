// Import react library
import { useState } from "react";

// Import tailwind css
import { useSelector } from "react-redux";
import "../index.css";

// Import react router dom
import { useNavigate, useLocation } from "react-router-dom";

// Import translation
import { useTranslation } from "react-i18next";

//Import icon
import { FaAngleDown, FaCartShopping } from "react-icons/fa6";

//Import color theme
import { colors } from "../../public/theme";

//Import MUI
import { Stack } from "@mui/material";
import LoopIcon from "@mui/icons-material/Loop";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
//Import Element
import SearchBar from "./searchBar";
import { IconButton, TextButton } from "./button";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { signOut } from "../features/authentication/authenticationSlice";
import {
    logOutFailResponse,
    logOutSuccessResponse,
} from "../models/user.model";

//Axios client
import axiosClient from "../../axios-client";
export default function Header() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    //State to save translation dropdown
    const [isDropdown, _setDropdown] = useState(false);
    function setDropdown() {
        _setDropdown(!isDropdown);
    }

    const changeLanguageHandler = (lang: "en" | "vn") => {
        i18n.changeLanguage(lang);
    };

    //Redux
    const { user, token } = useAppSelector((state) => state.authentication);
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
    return (
        <div className="flex flex-col bg-primary_main ">
            <div className="flex flex-row grow items-center justify-between p-2">
                <div className="flex flex-col md:flex-row md:items-center">
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
                                onClick={() => navigate("/user/account")}
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
                        <div className="flex flex-row">
                            <p
                                className=" font-bold text-xs text-white capitalize my-0 mx-1 cursor-pointer"
                                onClick={() => navigate("/login")}
                            >
                                {t("login")}
                            </p>
                            <div className="border-1 border-white"></div>
                            <p
                                className=" font-bold text-xs text-white capitalize my-0 mx-1 cursor-pointer"
                                onClick={() => navigate("/signup")}
                            >
                                {t("signup")}
                            </p>
                        </div>
                    )}

                    <div className="dropdown dropdown-bottom dropdown-end my-0  flex">
                        <label tabIndex={0} className="">
                            <div>
                                <div
                                    className="mx-3 flex flex-row items-center "
                                    onClick={() => setDropdown()}
                                    id="dropdownDefaultButton"
                                    data-dropdown-toggle="dropdown"
                                >
                                    <div className="mx-2">
                                        {i18n.language === "vn" && (
                                            <img
                                                src="/assets/vietnamese_flag.png"
                                                className="h-auto w-6"
                                            />
                                        )}
                                        {i18n.language === "en" && (
                                            <img
                                                src="/assets/english_flag.png"
                                                className="h-auto w-6"
                                            />
                                        )}
                                    </div>

                                    <FaAngleDown
                                        style={{ color: colors.white }}
                                    />
                                </div>
                            </div>
                        </label>
                        <div
                            tabIndex={0}
                            className="dropdown-content z-[1] menu  shadow  rounded-box w-52 bg-white"
                        >
                            <div
                                className="flex flex-row items-center py-2 px-2 hover:bg-gray-100"
                                onClick={() => changeLanguageHandler("vn")}
                            >
                                <img
                                    src="/assets/vietnamese_flag.png"
                                    className="h-auto w-6"
                                />
                                <span className="flex flex-col">
                                    <span className="font-medium text-xs capitalize my-0 mx-1 text-gray-100">
                                        Tiếng Việt
                                    </span>
                                </span>
                            </div>
                            <div
                                className="flex flex-row items-center py-2 px-2 hover:bg-gray-100"
                                onClick={() => changeLanguageHandler("en")}
                            >
                                <img
                                    src="/assets/english_flag.png"
                                    className="h-auto w-6"
                                />
                                <span className="flex flex-col">
                                    <span className="font-medium text-xs capitalize my-0 mx-1 text-gray-100">
                                        English
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-1 items-center justify-between mt-3 px-4">
                <div className="flex flex-1 mx-4">
                    <SearchBar />
                </div>
                <div
                    className="flex flex-row cursor-pointer"
                    onClick={() => navigate("/cart")}
                >
                    <FaCartShopping
                        style={{ color: colors.white }}
                        size={24}
                        className="mr-3"
                    />
                    <span className="font-medium text-xs text-white capitalize my-0 mx-1">
                        {t("shoppingCart")}
                    </span>
                </div>
            </div>
            <div className="flex flex-1 justify-between my-0 mt-3 px-2">
                <Stack direction="row" spacing={2}>
                    <TextButton
                        sx={
                            location.pathname === "/home"
                                ? {
                                      "border-bottom-style": "solid",
                                      "border-width": "2px",
                                      "border-radius": "0",
                                  }
                                : undefined
                        }
                        className="text-white text-sm"
                        onClick={() => navigate("/home")}
                    >
                        {t("home")}
                    </TextButton>
                    <TextButton
                        sx={
                            location.pathname.split("/")[1] === "product"
                                ? {
                                      "border-bottom-style": "solid",
                                      "border-width": "2px",
                                      "border-radius": "0",
                                  }
                                : undefined
                        }
                        className="text-white text-sm"
                        onClick={() => navigate("/product")}
                    >
                        {t("product")}
                    </TextButton>
                    <TextButton
                        className="text-white text-sm"
                        onClick={() => navigate("/product")}
                    >
                        {t("wholesaleProduct")}
                    </TextButton>
                    <TextButton
                        className="text-white text-sm"
                        onClick={() => navigate("/product")}
                    >
                        {t("news")}
                    </TextButton>
                </Stack>
                <Stack direction="row" spacing={2} className="pr-2">
                    <IconButton
                        startIcon={<LoopIcon />}
                        className="text-white text-sm"
                        sx={{ textTransform: "none" }}
                        onClick={() => navigate("/user/seen")}
                    >
                        {t("seen")}
                    </IconButton>
                    <IconButton
                        startIcon={<FavoriteBorderIcon />}
                        className="text-white text-sm"
                        sx={{ textTransform: "none" }}
                        onClick={() => navigate("/user/liked")}
                    >
                        {t("liked")}
                    </IconButton>
                    <IconButton
                        startIcon={<ReceiptLongIcon />}
                        className="text-white text-sm"
                        sx={{ textTransform: "none" }}
                        onClick={() => navigate("/user/order")}
                    >
                        {t("order")}
                    </IconButton>
                </Stack>
            </div>
        </div>
    );
}
