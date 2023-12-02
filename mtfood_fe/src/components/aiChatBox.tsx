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

function ShowSearch({
    handleFullscreenClick,
    products,
}: {
    handleFullscreenClick: () => void;
    products: Array<product>;
}) {
    const { t } = useTranslation();
    return (
        <div
            className="flex w-fit max-w-1/2 h-24 rounded  ml-10 p-2 items-center border-[1px] border-[#EBEBF0] hover:bg-[#27270C12] cursor-pointer space-x-2"
            onClick={handleFullscreenClick}
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
                          />
                      ))
                : products.map((product: product) => (
                      <img src={product.image_url} />
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
function ChatMessage({
    message,
    previousMessage,
    handleFullscreenClick,
}: {
    message: userUtteredMessage | botUttererMessage;
    previousMessage?: userUtteredMessage | botUttererMessage;
    handleFullscreenClick: () => void;
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
                    .catch(({ response }: { response: any }) => {
                        console.log(response);
                    });
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
                    <ShowSearch
                        handleFullscreenClick={handleFullscreenClick}
                        products={products}
                    />
                )}
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
    const [fullscreen, setFullScreen] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<{
        keyword: string;
        type: string;
    } | null>(null);
    const [productByKeyword, setProductByKeyword] = useState<product[] | null>(
        null
    );
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

    const handleFullScreenClick = () => {
        if (!fullscreen) {
            setFullScreen(true);
        }
    };
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
                if ("products" in responseData) {
                    newMessage.products = responseData.products;
                    setKeyword({
                        keyword: responseData.product_keyword,
                        type: "product",
                    });
                }

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

    useEffect(() => {
        if (fullscreen && keyword) {
            const payload = {
                sort: "common",
                offset: 0,
                limit: 12,
                keyword: keyword.keyword,
            };
            axiosClient
                .get("/productByFilter", {
                    params: {
                        ...payload,
                    },
                })
                .then(({ data }: { data: any }) => {
                    setProductByKeyword(data.result.product);
                })
                .catch(({ response }) => console.log(response));
        }
    }, [keyword, fullscreen]);
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
                className={`z-40 fixed flex w-1/2 lg:w-2/5 xl:w-2/6 2xl:w-2/6 h-[70vh] justify-end items-end
                    ${active === "aichat" ? "visible" : "hidden"}`}
                keepMounted
            >
                <Paper
                    elevation={5}
                    className="flex flex-col w-full h-full bg-white rounded-md m-4"
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
                                        handleFullscreenClick={
                                            handleFullScreenClick
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
            {fullscreen && (
                <div className="flex flex-col w-screen h-screen fixed top-0 left-0 right-0 bottom-0 bg-[#f5f6f7] overflow-hidden">
                    <div className="flex w-full h-fit bg-white flex-row items-center justify-between px-8 py-2">
                        <div className="flex flex-row space-x-3 items-center">
                            <img
                                src="/assets/chatbot.png"
                                alt="avatar"
                                className="w-12 h-12"
                            />
                            <p className="text-xl font-bold">Trợ lý AI</p>
                        </div>
                        <div className="flex flex-row space-x-8 items-center">
                            <CloseFullscreenIcon className="w-6 h-6" />
                            <CloseIcon className="w-7 h-7" />
                        </div>
                    </div>
                    <div className="flex flex-row w-full h-full p-4">
                        <div className="flex flex-col w-1/2 h-full space-y-2">
                            <Paper className="bg-white flex h-full w-full flex-col space-y-1  overflow-auto scroll-auto">
                                {messages.map(
                                    (
                                        message:
                                            | userUtteredMessage
                                            | botUttererMessage,
                                        index: number
                                    ) => (
                                        <div
                                            className="flex flex-col"
                                            key={index}
                                        >
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
                                                handleFullscreenClick={
                                                    handleFullScreenClick
                                                }
                                            />
                                        </div>
                                    )
                                )}
                                {loading && (
                                    <div className="flex w-full justify-start flex-row p-2 overflow-hidden">
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
                            </Paper>

                            <ChatInput
                                loading={loading}
                                handleLoading={handleLoading}
                            />
                        </div>

                        <div className="w-1/2 h-full p-4 flex flex-col overflow-hidden">
                            {keyword && (
                                <p className="font-bold text-2xl">
                                    {t("searchFor")} "{keyword.keyword}"
                                </p>
                            )}
                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 w-full h-full mt-5 overflow-auto scroll-auto">
                                {productByKeyword &&
                                productByKeyword.length > 0 ? (
                                    productByKeyword.map((product: product) => (
                                        <ProductCard
                                            product={product}
                                            className="h-fit w-full min-w-fit"
                                        />
                                    ))
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
