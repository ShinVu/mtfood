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
    setLoadingTrue,
    setUserUtteredMessage,
} from "../features/chat/chatSlice";
import { botUttererMessage, userUtteredMessage } from "../models/chat.model";
import { product } from "../models/product.model";
import axiosClient from "../../axios-client";
import { ProductCard } from "../features/product";
import CloseIcon from "@mui/icons-material/Close";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

export default function AiChatInput() {
    const { t } = useTranslation();
    const { register, handleSubmit, watch, reset } = useForm();
    const watchMessage = watch("message", "");

    const { user, token } = useAppSelector((state) => state.authentication);
    const { loading } = useAppSelector((state) => state.chat);
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
                dispatch(setLoadingTrue());
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
        <Paper className="flex h-fit flex-row justify-between items-center p-2 ">
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
