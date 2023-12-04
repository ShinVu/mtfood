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
    setUserUtteredMessage,
} from "../features/chat/chatSlice";
import { botUttererMessage, userUtteredMessage } from "../models/chat.model";
import { product } from "../models/product.model";
import axiosClient from "../../axios-client";
import { ProductCard } from "../features/product";
import CloseIcon from "@mui/icons-material/Close";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import AiShowSearch from "./aishowSearch";

export default function AiChatMessage({
    message,
    previousMessage,
}: {
    message: userUtteredMessage | botUttererMessage;
    previousMessage?: userUtteredMessage | botUttererMessage;
}) {
    if (message.type === "user") {
        return (
            <div className="flex  justify-start flex-row-reverse mr-2">
                {previousMessage && previousMessage.type === message.type ? (
                    <div className="w-11"></div>
                ) : (
                    <Avatar />
                )}

                <div className="mr-2 flex flex-col items-end w-full justify-center">
                    <Tooltip
                        title={timeChatMessageFormat(message.timestamp)}
                        TransitionComponent={Zoom}
                        placement="left"
                        enterNextDelay={500}
                        enterDelay={1000}
                    >
                        <p className="text-white font-regular w-fit max-w-[75%] bg-primary_main rounded p-2 text-clip li leading-none text-sm">
                            {message.message}
                        </p>
                    </Tooltip>
                </div>
            </div>
        );
    } else {
        const [products, setProduct] = useState<Array<product> | null>(null);
        useEffect(() => {
            const getProductByIds = () => {
                const payload = { productIds: message.products };
                axiosClient
                    .get("/productByIds", {
                        params: {
                            ...payload,
                        },
                    })
                    .then(({ data }: { data: any }) => {
                        const products = data.result.product;
                        if (products) {
                            setProduct(products);
                        }
                    })
                    .catch();
            };

            if ("products" in message) {
                if (!products) {
                    getProductByIds();
                }
            }
        }, []);
        return (
            <div className="flex flex-col w-full p-2 space-y-2">
                <div className="flex flex-row justify-start">
                    {previousMessage &&
                    previousMessage.type === message.type ? (
                        <div className="w-11"></div>
                    ) : (
                        <img
                            src="/assets/chatbot.png"
                            alt="avatar"
                            className="w-8 h-8"
                        />
                    )}

                    <div className="ml-2 flex flex-col items-start w-full justify-center">
                        <Tooltip
                            title={timeChatMessageFormat(message.timestamp)}
                            TransitionComponent={Zoom}
                            placement="left"
                            enterNextDelay={500}
                            enterDelay={1000}
                        >
                            <p className="text-black  font-regular w-fit max-w-[75%] bg-[#f5f6f7] rounded p-2 text-clip whitespace-pre-wrap text-sm">
                                <span className="text-blue font-bold">
                                    Trợ lý AI
                                </span>
                                <br />
                                {message.message}
                            </p>
                        </Tooltip>
                    </div>
                </div>
                {products && (
                    <AiShowSearch products={products} message={message} />
                )}
            </div>
        );
    }
}
