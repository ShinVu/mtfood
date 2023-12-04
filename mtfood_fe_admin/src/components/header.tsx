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
import {
    handleLogInDialogOpen,
    signOut,
} from "../features/authentication/authenticationSlice";
import {
    logOutFailResponse,
    logOutSuccessResponse,
} from "../models/user.model";

//Axios client
import axiosClient from "../../axios-client";
import { styled } from "@mui/material/styles";
import { BadgeProps } from "@mui/material/Badge";
import LanguagePopper from "./languagePopper";
const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: 11,
        top: 0,
        backgroundColor: colors.blue,
        padding: "0 4px",
    },
}));

export default function Header() {
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
        <div className="flex flex-row bg-rich-black justify-between text-white text-2xl items-center px-8">
            <p>MTFOOD</p>
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
            </div>
        </div>
    );
}
