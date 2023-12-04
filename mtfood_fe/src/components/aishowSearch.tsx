import {
    Avatar,
    Button,
    CircularProgress,
    Divider,
    Fab,
    IconButton,
    Paper,
    Popper,
    TextField,
    Tooltip,
    Zoom,
} from "@mui/material";

import ChatIcon from "@mui/icons-material/Chat";
import { colors } from "../../public/theme";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { BsRobot } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import {
    compareTimeDiffDay,
    timeChatMessageFormat,
    timeChatMessageHeaderFormat,
    timeDiffByMinute,
} from "../utils";
import { socket } from "../socket/socket";
import { useForm } from "react-hook-form";
import {
    setBotUtteredMessage,
    setFullscreen,
    setKeyword,
    setSearchLoading,
    setUserUtteredMessage,
} from "../features/chat/chatSlice";
import { botUttererMessage, userUtteredMessage } from "../models/chat.model";
import { product } from "../models/product.model";
import axiosClient from "../../axios-client";
import { ProductCard } from "../features/product";
import CloseIcon from "@mui/icons-material/Close";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

export default function AiShowSearch({
    products,
    message,
}: {
    products: Array<product>;
    message: botUttererMessage;
}) {
    const { t } = useTranslation();

    const { fullscreen } = useAppSelector((state) => state.chat);
    const dispatch = useAppDispatch();
    const handleItemClick = () => {
        if (!fullscreen) {
            dispatch(setFullscreen());
        }
        const payload = {
            keyword: message.productKeyword,
            type: "product",
        };
        dispatch(setKeyword(payload));
        dispatch(setSearchLoading());
    };
    return (
        <div
            className="flex w-fit max-w-1/2 h-24 rounded  ml-10 p-2 items-center border-[1px] border-[#EBEBF0] hover:bg-[#27270C12] cursor-pointer space-x-2"
            onClick={handleItemClick}
        >
            {products.length > 2
                ? products
                      .slice(0, 2)
                      .map((product: product) => (
                          <img
                              src={product.image_url}
                              alt={product.name}
                              className="w-16 h-16"
                              loading="lazy"
                              key={product.id}
                          />
                      ))
                : products.map((product: product) => (
                      <img src={product.image_url} key={product.id} />
                  ))}
            {products.length > 2 && (
                <div className="relative w-16 h-16 bg-black">
                    <img
                        src={products[2].image_url}
                        alt={products[2].name}
                        className="w-16 h-16"
                        loading="lazy"
                    />
                    <div className="absolute top-0 left-0 bg-[#00000040] w-full h-full">
                        <div className="flex w-full h-full items-center justify-center text-white">
                            +2
                        </div>
                    </div>
                </div>
            )}
            <p className="font-semibold text-sm ml-2">{t("viewProduct")}</p>
        </div>
    );
}
