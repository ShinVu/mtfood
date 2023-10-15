// Import react library
import { useState } from "react";

// Import tailwind css
import { useSelector } from "react-redux";
import "../index.css";

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
import SearchBar from "./SearchBar";
import { IconButton, TextButton } from "./button";

export default function Header() {
    const { t, i18n } = useTranslation();

    //Get uset information from redux
    const { user, token } = useSelector((state) => state.authentication);

    //State to save translation dropdown
    const [isDropdown, _setDropdown] = useState(false);

    function setDropdown() {
        _setDropdown(!isDropdown);
    }

    const changeLanguageHandler = (lang) => {
        i18n.changeLanguage(lang);
    };
    return (
        <div className="flex flex-column bg-primary_main">
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
                        <p className=" font-medium text-xs text-white capitalize my-0 mx-1">
                            {t("hello")},{" "}
                            <span className="font-bold">{user}</span>
                        </p>
                    ) : (
                        <div className="flex flex-row">
                            <p className=" font-bold text-xs text-white capitalize my-0 mx-1">
                                {t("login")}
                            </p>
                            <div className="border-1 border-white"></div>
                            <p className=" font-bold text-xs text-white capitalize my-0 mx-1">
                                {t("logout")}
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
                                        <img
                                            src="/assets/vietnamese_flag.png"
                                            className="h-auto w-6"
                                        />
                                    </div>

                                    <FaAngleDown
                                        style={{ color: colors.white }}
                                    />
                                </div>
                            </div>
                        </label>
                        <div
                            tabIndex={0}
                            className="dropdown-content z-[1] menu  shadow bg-base-100 rounded-box w-52 bg-white"
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
                                    <span className="font-medium text-xs capitalize my-0 mx-1">
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
                                    <span className="font-medium text-xs capitalize my-0 mx-1">
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
                <div className="flex flex-row">
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
                        className="text-white text-base"
                        sx={{
                            "border-bottom-style": "solid",
                            "border-width": "2px",
                            "border-radius": "0",
                        }}
                    >
                        {t("home")}
                    </TextButton>
                    <TextButton className="text-white text-base">
                        {t("product")}
                    </TextButton>
                    <TextButton className="text-white text-base">
                        {t("wholesaleProduct")}
                    </TextButton>
                    <TextButton className="text-white text-base">
                        {t("news")}
                    </TextButton>
                </Stack>
                <Stack direction="row" spacing={2} className="pr-2">
                    <IconButton
                        startIcon={<LoopIcon />}
                        className="text-white text-base"
                        sx={{ textTransform: "none" }}
                    >
                        {t("seen")}
                    </IconButton>
                    <IconButton
                        startIcon={<FavoriteBorderIcon />}
                        className="text-white text-base"
                        sx={{ textTransform: "none" }}
                    >
                        {t("liked")}
                    </IconButton>
                    <IconButton
                        startIcon={<ReceiptLongIcon />}
                        className="text-white text-base"
                        sx={{ textTransform: "none" }}
                    >
                        {t("order")}
                    </IconButton>
                </Stack>
            </div>
        </div>
    );
}
