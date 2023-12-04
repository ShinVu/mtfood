import { useEffect, useRef, useState } from "react";
import axiosClient from "../../axios-client";
import CloseIcon from "@mui/icons-material/Close";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { Button, CircularProgress, IconButton, Paper } from "@mui/material";
import { botUttererMessage, userUtteredMessage } from "../models/chat.model";
import AiChatMessageTimeHeader from "../components/chatMessageTimeHeader";
import AiChatMessage from "../components/aichatMessage";
import AiChatInput from "../components/aiChatinput";
import { ProductCard } from "../features/product";
import { product } from "../models/product.model";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { useTranslation } from "react-i18next";
import {
    deleteFullscreen,
    deleteSearchLoading,
    setSearchLoading,
} from "../features/chat/chatSlice";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function FullScreenAIChat() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const chatRef = useRef(null);
    const { searchKeyword, messages, searchLoading } = useAppSelector(
        (state) => state.chat
    );
    const [productByKeyword, setProductByKeyword] = useState<product[] | null>(
        null
    );
    useEffect(() => {
        if (searchKeyword) {
            if (searchKeyword.type == "product") {
                const payload = {
                    sort: "common",
                    offset: 0,
                    limit: 12,
                    keyword: searchKeyword.keyword,
                };
                axiosClient
                    .get("/productByFilter", {
                        params: {
                            ...payload,
                        },
                    })
                    .then(({ data }: { data: any }) => {
                        setProductByKeyword(data.result.product);
                        dispatch(deleteSearchLoading());
                    })
                    .catch(({ response }) => console.log(response));
            } else if (searchKeyword.type == "order") {
            }
        }
    }, [searchKeyword]);

    const dispatch = useAppDispatch();
    const handleCloseFullscreen = () => {
        dispatch(deleteFullscreen());
    };
    const handleSeeMore = () => {
        const path = {
            pathname: "/product",
            search: createSearchParams({
                page: String(1),
                keyword: searchKeyword?.keyword,
            }).toString(),
        };
        navigate(path);
        handleCloseFullscreen();
    };
    return (
        <div className="flex flex-col items-stretch w-screen h-screen fixed top-0 left-0 right-0 bottom-0 bg-[#f5f6f7]">
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
                    <IconButton onClick={handleCloseFullscreen}>
                        {" "}
                        <CloseFullscreenIcon className="w-6 h-6" />
                    </IconButton>
                    <IconButton onClick={handleCloseFullscreen}>
                        {" "}
                        <CloseIcon className="w-7 h-7" />
                    </IconButton>
                </div>
            </div>
            <div className="flex flex-row w-full h-full p-4">
                <div className="flex flex-col  w-1/2 h-full space-y-2">
                    <Paper className="bg-white flex flex-col h-full space-y-1 overflow-auto scroll-auto">
                        {messages.map(
                            (
                                message: userUtteredMessage | botUttererMessage,
                                index: number
                            ) => (
                                <div className="flex flex-col mt-1" key={index}>
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
                    </Paper>

                    <AiChatInput />
                </div>

                <div className="w-1/2 h-full px-4 flex flex-col overflow-hidden">
                    {searchKeyword && (
                        <p className="font-bold text-2xl">
                            {t("searchFor")} "{searchKeyword.keyword}"
                        </p>
                    )}
                    {searchLoading ? (
                        <CircularProgress className="self-center" />
                    ) : (
                        <div className="flex flex-col w-full h-[calc(100%-100px)] overflow-auto scroll-auto">
                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-5">
                                {productByKeyword &&
                                productByKeyword.length > 0 ? (
                                    productByKeyword.map((product: product) => (
                                        <ProductCard
                                            product={product}
                                            className="w-full h-fit"
                                        />
                                    ))
                                ) : (
                                    <></>
                                )}
                            </div>
                            {productByKeyword &&
                                productByKeyword.length >= 12 && (
                                    <Button
                                        className="w-fit bg-rich-black text-white self-center mt-4"
                                        onClick={handleSeeMore}
                                    >
                                        {t("seeMore")}
                                    </Button>
                                )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
