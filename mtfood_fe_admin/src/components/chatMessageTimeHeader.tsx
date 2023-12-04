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

export default function AiChatMessageTimeHeader({
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
