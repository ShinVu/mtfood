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

function ChatMessageTimeHeader({
    message,
    index,
    previousMessage,
}: {
    message: userUtteredMessage | botUttererMessage;
    index: number;
    previousMessage?: userUtteredMessage | botUttererMessage;
}) {
    if (
        index === 0 ||
        (previousMessage &&
            compareTimeDiffDay(message.timestamp, previousMessage.timestamp))
    ) {
        return (
            <Divider className="text-gray-100 text-xs" variant="middle">
                {timeChatMessageHeaderFormat(message.timestamp)}
            </Divider>
        );
    } else {
        return undefined;
    }
}

function ShowSearch() {
    const { t } = useTranslation();
    return (
        <div className="flex min-w-[50%] w-fit h-24 rounded  ml-10 p-2 items-center border-[1px] border-[#EBEBF0] hover:bg-[#27270C12] cursor-pointer">
            <img src="./assets/momo.png" />
            <img src="./assets/momo.png" />
            <img src="./assets/momo.png" />
            <p className="font-semibold text-sm ml-2">{t("viewProduct")}</p>
        </div>
    );
}
function ChatMessage({
    message,
    previousMessage,
}: {
    message: userUtteredMessage | botUttererMessage;
    previousMessage?: userUtteredMessage | botUttererMessage;
}) {
    if (message.type === "user") {
        return (
            <div className="flex  justify-start flex-row-reverse w-full">
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
                <ShowSearch />
            </div>
        );
    }
}

function ChatInput({
    loading,
    handleLoading,
}: {
    loading: boolean;
    handleLoading: () => void;
}) {
    const { t } = useTranslation();
    const { register, handleSubmit, watch, reset } = useForm();
    const watchMessage = watch("message", "");

    const { user, token } = useAppSelector((state) => state.authentication);
    const dispatch = useAppDispatch();

    const sendMessage = (message: string) => {
        if (!loading) {
            if (message) {
                reset(
                    {
                        message: "",
                    },
                    {
                        keepErrors: true,
                        keepDirty: true,
                    }
                );
                const newUserUtteredMessage: userUtteredMessage = {
                    message: message,
                    sender: user ? user.id : null,
                    metadata: {
                        user: user
                            ? {
                                  id: user.id,
                                  name: user.name,
                              }
                            : null,
                        token: token ? token : null,
                    },
                    timestamp: new Date().getTime() / 1000,
                    type: "user",
                };

                socket.emit("user_uttered", newUserUtteredMessage);

                dispatch(setUserUtteredMessage(newUserUtteredMessage));
                handleLoading();
            }
        }
    };

    const onSubmit = (data: any) => {
        if (data.message) {
            sendMessage(data.message);
        }
    };
    const keyPress = (e: any) => {
        if (e.keyCode == 13) {
            sendMessage(watchMessage);
        }
    };
    return (
        <Paper className="flex flex-row justify-between items-center p-2 ">
            <TextField
                type="text"
                id="messageInput"
                placeholder={t("typeMessage")}
                className="flex flex-1"
                onKeyDown={keyPress}
                {...register("message")}
                size="small"
            />
            <IconButton className="ml-1">
                {" "}
                <AttachFileIcon />
            </IconButton>

            {loading ? (
                <CircularProgress
                    className="text-[#808080]"
                    disableShrink
                    size="24px"
                />
            ) : (
                <IconButton onClick={handleSubmit(onSubmit)}>
                    {" "}
                    <SendIcon sx={{ color: colors.blue }} />
                </IconButton>
            )}
        </Paper>
    );
}
export default function AIChat({
    active,
    handleAiChatOpen,
    handleClose,
}: {
    active: string;
    handleAiChatOpen: () => void;
    handleClose: () => void;
}) {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleLoading = () => {
        setLoading(true);
    };
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
    const { messages } = useAppSelector((state) => state.chat);

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
                dispatch(setBotUtteredMessage(newMessage));
                setLoading(false);
            } catch (e) {
                //message is a normal text

                const newMessage: botUttererMessage = {
                    message: response,
                    timestamp: new Date().getTime() / 1000,
                    type: "bot",
                };

                dispatch(setBotUtteredMessage(newMessage));
                setLoading(false);
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
    return (
        <>
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
                className={`z-50 flex w-full justify-end items-end 
                    ${active === "aichat" ? "visible" : "hidden"}`}
                keepMounted
            >
                <Paper
                    elevation={5}
                    className="flex flex-col w-1/2 lg:w-2/5 xl:w-2/6 2xl:w-2/6 h-[70vh] z-[9999] bg-white rounded-md mr-4"
                >
                    <div className="flex  bg-primary_main text-white rounded-t-md p-3">
                        {t("chatMessage")}
                    </div>

                    <div className="bg-white flex h-full w-full flex-col space-y-1 mt-2 p-2 overflow-auto scroll-auto">
                        {messages.map(
                            (
                                message: userUtteredMessage | botUttererMessage,
                                index: number
                            ) => (
                                <div className="flex flex-col" key={index}>
                                    <ChatMessageTimeHeader
                                        message={message}
                                        index={index}
                                        previousMessage={
                                            index > 0
                                                ? messages[index - 1]
                                                : undefined
                                        }
                                    />
                                    <ChatMessage
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
                    <ChatInput
                        loading={loading}
                        handleLoading={handleLoading}
                    />
                </Paper>
            </Popper>
        </>
    );
}
