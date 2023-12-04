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
    clearMessage,
    setBotUtteredMessage,
    setFullscreen,
    setKeyword,
    setLoadingFalse,
    setLoadingTrue,
    setUserUtteredMessage,
} from "../features/chat/chatSlice";
import { botUttererMessage, userUtteredMessage } from "../models/chat.model";
import { product } from "../models/product.model";
import axiosClient from "../../axios-client";
import { ProductCard } from "../features/product";
import CloseIcon from "@mui/icons-material/Close";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import AiChatMessageTimeHeader from "./chatMessageTimeHeader";
import AiChatMessage from "./aichatMessage";
import AiChatInput from "./aiChatinput";
import { MdFullscreen } from "react-icons/md";
import { MdClearAll } from "react-icons/md";

export default function AIChat({
    active,
    handleAiChatOpen,
    handleClose,
}: {
    active: string | null;
    handleAiChatOpen: () => void;
    handleClose: () => void;
}) {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (active === "aichat") {
            handleClose();
            setAnchorEl(null);
        } else {
            handleAiChatOpen();
            setAnchorEl(event.currentTarget);
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? "ai-chat" : undefined;
    const chatRef = useRef(null);

    //Redux
    const { user } = useAppSelector((state) => state.authentication);
    const { messages, loading, fullscreen } = useAppSelector(
        (state) => state.chat
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        function onConnect() {
            console.log("Connected to Socket.io server");
        }

        function onDisconnect() {
            console.log("Disconnected from Socket.io server");
        }

        function botUtteredMessage(value: any) {
            //Check if text is a valid JSON object
            const response: string = value.text;
            try {
                const responseData = JSON.parse(response);

                const newMessage: botUttererMessage = {
                    message: responseData.message,
                    timestamp: new Date().getTime() / 1000,
                    type: "bot",
                };
                if ("products" in responseData) {
                    newMessage.products = responseData.products;
                    newMessage.productKeyword = responseData.product_keyword;
                    const payload = {
                        keyword: newMessage.productKeyword,
                        type: "product",
                    };
                    dispatch(setKeyword(payload));
                }

                dispatch(setBotUtteredMessage(newMessage));
                dispatch(setLoadingFalse());
            } catch (e) {
                //message is a normal text

                const newMessage: botUttererMessage = {
                    message: response,
                    timestamp: new Date().getTime() / 1000,
                    type: "bot",
                };

                dispatch(setBotUtteredMessage(newMessage));
                dispatch(setLoadingFalse());
            }
        }
        socket.on("connect", onConnect);

        socket.on("connect_error", onDisconnect);

        socket.on("bot_uttered", botUtteredMessage);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("bot_uttered", botUtteredMessage);
        };
    }, []);

    useEffect(() => {
        const handleScrollToBottom = () => {
            chatRef.current?.scrollIntoView({ behavior: "smooth" });
        };
        handleScrollToBottom();
    }, [messages]);

    const handleOpenFullscreen = () => {
        dispatch(setFullscreen());
    };

    const handleClearMessages = () => {
        dispatch(clearMessage());
    };
    return (
        <div className={fullscreen ? "hidden" : "visible"}>
            <div
                aria-describedby={id}
                className="h-12 flex flex-col items-center text-white font-bold  mt-2 text-xs p-0 cursor-pointer"
                onClick={handleClick}
            >
                <img
                    src="/assets/chatbot.png"
                    alt="avatar"
                    className="w-8 h-8"
                />

                {t("assistant")}
            </div>
            <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                placement="left-end"
                className={`z-40 fixed flex w-1/2 lg:w-2/5 xl:w-2/6 2xl:w-2/6 h-[70vh] justify-end items-end
                    ${active === "aichat" ? "visible" : "hidden"} ${
                    fullscreen ? "hidden" : "visible"
                }`}
                keepMounted
            >
                <Paper
                    elevation={5}
                    className="flex flex-col w-full h-full bg-white rounded-md m-4"
                >
                    <div className="flex flex-row justify-between items-center bg-primary_main text-white rounded-t-md p-3">
                        <div className="flex flex-row space-x-3 items-center">
                            <img
                                src="/assets/chatbot.png"
                                alt="avatar"
                                className="w-10 h-10"
                            />
                            <p className="text-lg font-bold">Trợ lý AI</p>
                        </div>
                        <div className="flex flex-row space-x-2 items-center">
                            <IconButton onClick={handleClearMessages}>
                                {" "}
                                <MdClearAll className="w-5 h-5 text-white" />
                            </IconButton>

                            <IconButton onClick={handleOpenFullscreen}>
                                {" "}
                                <CloseFullscreenIcon className="w-4 h-4 text-white" />
                            </IconButton>
                            <IconButton onClick={handleClose}>
                                {" "}
                                <CloseIcon className="w-5 h-5 text-white" />
                            </IconButton>
                        </div>
                    </div>

                    <div className="bg-white flex h-full w-full flex-col space-y-1 mt-2 p-2 overflow-auto scroll-auto">
                        {messages.map(
                            (
                                message: userUtteredMessage | botUttererMessage,
                                index: number
                            ) => (
                                <div className="flex flex-col" key={index}>
                                    <AiChatMessageTimeHeader
                                        message={message}
                                        index={index}
                                        previousMessage={
                                            index > 0
                                                ? messages[index - 1]
                                                : undefined
                                        }
                                    />
                                    <AiChatMessage
                                        message={message}
                                        previousMessage={
                                            index > 0
                                                ? messages[index - 1]
                                                : undefined
                                        }
                                    />
                                </div>
                            )
                        )}
                        {loading && (
                            <div className="flex w-full justify-start flex-row p-2">
                                <img
                                    src="/assets/chatbot.png"
                                    alt="avatar"
                                    className="w-8 h-8"
                                />
                                <div className="flex flex-col self-start   max-w-[75%] bg-[#f5f6f7] rounded p-2 ml-2">
                                    <p className="text-blue font-bold text-sm p-0">
                                        Trợ lý AI
                                    </p>

                                    <div className="flex flex-row space-x-1 animate-pulse items-center  mt-1">
                                        <div className="w-1 h-1 bg-[#808080] rounded-full"></div>
                                        <div className="w-1 h-1 bg-[#808080] rounded-full"></div>
                                        <div className="w-1 h-1 bg-[#808080] rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={chatRef} />
                    </div>

                    <Divider />
                    <AiChatInput />
                </Paper>
            </Popper>
        </div>
    );
}
