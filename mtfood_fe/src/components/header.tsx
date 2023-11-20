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
import {
    Badge,
    Button,
    Divider,
    MenuItem,
    Popper,
    Select,
    SelectChangeEvent,
    Stack,
} from "@mui/material";
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
import { styled } from "@mui/material/styles";
import { BadgeProps } from "@mui/material/Badge";
const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: 11,
        top: 0,
        backgroundColor: colors.blue,
        padding: "0 4px",
    },
}));

function LanguagePopper() {
    const { t, i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const changeLanguageHandler = (lang: string) => {
        if (lang === "en" || lang === "vn") {
            i18n.changeLanguage(lang);
        }
        handleClick();
    };
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;

    return (
        <div>
            <div
                className="mx-3 flex flex-row items-center"
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                onClick={handleClick}
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

                <FaAngleDown style={{ color: colors.white }} />
            </div>
            <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                className="z-50"
                placement={"bottom-end"}
            >
                <div className="mt-2 bg-white">
                    <div
                        className="flex flex-row items-center  hover:bg-gray-100 px-2 py-3 "
                        onClick={() => changeLanguageHandler("vn")}
                    >
                        <img
                            src="/assets/vietnamese_flag.png"
                            className="h-auto w-6"
                        />
                        <span className="flex flex-col">
                            <span className="font-medium text-xs capitalize my-0 mx-1 text-black">
                                Tiếng Việt
                            </span>
                        </span>
                    </div>
                    <Divider />
                    <div
                        className="flex flex-row items-center  hover:bg-gray-100 px-2 py-2"
                        onClick={() => changeLanguageHandler("en")}
                    >
                        <img
                            src="/assets/english_flag.png"
                            className="h-auto w-6"
                        />
                        <span className="flex flex-col">
                            <span className="font-medium text-xs capitalize my-0 mx-1 text-black">
                                English
                            </span>
                        </span>
                    </div>
                </div>
            </Popper>
        </div>
    );
}

export default function Header() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    //State to save translation dropdown
    const [isDropdown, _setDropdown] = useState(false);
    function setDropdown() {
        _setDropdown(!isDropdown);
    }

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

    return (
        <div className="flex flex-col bg-rich-black">
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
                    {/* <div className="dropdown dropdown-bottom dropdown-end my-0  flex">
                        <label tabIndex={0} className="">
                            <div onClick={() => setDropdown()}>
                                <div
                                    className="mx-3 flex flex-row items-center "
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
                            className="dropdown-content z-[999] menu  shadow  rounded-box w-52 bg-white mt-2"
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
                                    <span className="font-medium text-xs capitalize my-0 mx-1 text-black">
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
                                    <span className="font-medium text-xs capitalize my-0 mx-1 text-black">
                                        English
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div> */}
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
                    <StyledBadge
                        badgeContent={Object.keys(productCart).length}
                        color="primary"
                        max={99}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <FaCartShopping
                            style={{ color: colors.white }}
                            size={24}
                            className="mr-3"
                        />
                    </StyledBadge>

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
                                      borderBottomStyle: "solid",
                                      borderWidth: "2px",
                                      borderRadius: "0",
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
                                      borderBottomStyle: "solid",
                                      borderWidth: "2px",
                                      borderRadius: "0",
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
