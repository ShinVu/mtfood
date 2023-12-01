import {
    Avatar,
    Button,
    Divider,
    Fab,
    Paper,
    Popper,
    TextField,
} from "@mui/material";

import ChatIcon from "@mui/icons-material/Chat";
import { colors } from "../../public/theme";
import { useState } from "react";
import { useAppSelector } from "../hooks/reduxHook";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useTranslation } from "react-i18next";
import {
    compareTimeDiffDay,
    timeChatMessageFormat,
    timeChatMessageHeaderFormat,
} from "../utils";
import { socket } from "../socket/socket";

type message = {
    id: number;
    type: string;
    userId: number;
    message: string;
    time: string;
};
const messages: message[] = [
    {
        id: 1,
        type: "customer",
        userId: 5,
        message: "helloworld",
        time: "1699947170",
    },
    {
        id: 2,

        type: "admin",
        userId: 6,
        message: "Ewqeqweqweqwe",
        time: "1699947170",
    },
    {
        id: 3,
        type: "customer",
        userId: 7,
        message:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        time: "1700054912",
    },
    {
        id: 4,
        type: "customer",
        userId: 7,
        message: "Lorem Ipsum ",
        time: "1700054912",
    },
];

function ChatMessageTimeHeader({
    message,
    index,
    previousMessage,
}: {
    message: message;
    index: number;
    previousMessage?: message;
}) {
    if (
        index === 0 ||
        (previousMessage &&
            compareTimeDiffDay(message.time, previousMessage.time))
    ) {
        return (
            <Divider className="text-gray-100 text-xs" variant="middle">
                {timeChatMessageHeaderFormat(message.time)}
            </Divider>
        );
    } else {
        return undefined;
    }
}
function ChatMessage({
    message,
    previousMessage,
}: {
    message: message;
    previousMessage?: message;
}) {
    if (message.type === "customer") {
        return (
            <>
                <div className="flex  justify-start flex-row-reverse p-2 w-full">
                    {previousMessage &&
                    previousMessage.type === message.type ? (
                        <div className="w-11"></div>
                    ) : (
                        <Avatar />
                    )}
                    <div className="mr-2 flex flex-col items-end w-full">
                        <p className="text-white text-base font-regular w-fit max-w-[75%] bg-primary_main rounded p-2 text-clip">
                            {message.message}
                        </p>

                        <p className="text-xs text-gray-100 font-medium mt-1">
                            {timeChatMessageFormat(message.time)}
                        </p>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <div className="flex w-full justify-start flex-row p-2">
                {previousMessage && previousMessage.type === message.type ? (
                    <div className="w-11"></div>
                ) : (
                    <Avatar />
                )}

                <div className="ml-2 flex flex-col items-start w-full">
                    <p className="text-black text-base font-regular w-fit max-w-[75%] bg-[#f5f6f7] rounded p-2 text-clip">
                        {message.message}
                    </p>
                    <p className="text-xs text-gray-100 font-medium mt-1">
                        {timeChatMessageFormat(message.time)}
                    </p>
                </div>
            </div>
        );
    }
}

function ChatInput() {
    const { t } = useTranslation();
    return (
        <Paper className="flex flex-row justify-between items-center p-4 ">
            <Avatar className="mr-4" />
            <TextField
                type="text"
                id="messageInput"
                placeholder={t("typeMessage")}
                className="flex flex-1"
            />
            <AttachFileIcon className="mx-4" />
            <SendIcon sx={{ color: colors.blue }} />
        </Paper>
    );
}
export default function Chat({
    active,
    handleChatOpen,
    handleClose,
}: {
    active: string;
    handleChatOpen: () => void;
    handleClose: () => void;
}) {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        //Set active current chat
        if (active === "chat") {
            handleClose();
            setAnchorEl(null);
        } else {
            handleChatOpen();
            setAnchorEl(event.currentTarget);
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? "chat" : undefined;

    //Redux
    const { user } = useAppSelector((state) => state.authentication);
    return (
        <>
            <div
                aria-describedby={id}
                className="h-12 flex flex-col items-center text-white font-bold mt-2 text-xs p-0 space-y-1  cursor-pointer"
                onClick={handleClick}
            >
                <ChatIcon sx={{ color: colors.white }} />
                {t("chat")}
            </div>
            <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                placement="left-end"
                className={`z-50 flex justify-end items-end +
                ${active === "chat" ? "visible" : "hidden"}`}
                keepMounted
            >
                <Paper
                    elevation={5}
                    className="flex flex-col w-1/2 lg:w-2/5 xl:w-2/6 2xl:w-2/6 h-[80vh] z-[9999] bg-white rounded-md mr-4"
                >
                    <div className="flex  bg-primary_main text-white rounded-t-md p-3">
                        {t("chatMessage")}
                    </div>

                    <div className="bg-white flex h-full w-full flex-col space-y-2 mt-2 overflow-auto scroll-auto">
                        {messages.map((message: message, index: number) => (
                            <div className="flex flex-col" key={message.id}>
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
                        ))}
                    </div>

                    <Divider />
                    <ChatInput />
                </Paper>
            </Popper>
        </>
    );
}
