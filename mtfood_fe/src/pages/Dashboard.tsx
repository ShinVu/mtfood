import { Box, Divider, Fab, Paper, Popper } from "@mui/material";
import { Outlet } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import { colors } from "../../public/theme";
import { useState } from "react";
import Chat from "../components/chatBox";
import LogInDialog from "../components/logInDialog";
import { useAppDispatch } from "../hooks/reduxHook";
import SnackbarDialog from "../components/snackbar";
import AIChat from "../components/aiChatBox";

export default function Dashboard() {
    //determine which chat dialog is open
    const [currentActiveChat, setCurrentActiveChat] = useState<string | null>(
        null
    );
    const handleAiChatOpen = () => {
        setCurrentActiveChat("aichat");
    };
    const handleChatOpen = () => {
        setCurrentActiveChat("chat");
    };

    const handleClose = () => {
        setCurrentActiveChat(null);
    };
    return (
        <div>
            <div className="flex flex-col fixed top-[75vh] right-8 bg-primary_main z-50 rounded w-fit px-2 py-2">
                <AIChat
                    active={currentActiveChat}
                    handleAiChatOpen={handleAiChatOpen}
                    handleClose={handleClose}
                />
                <Divider
                    sx={{ backgroundColor: colors.white }}
                    className="my-1"
                />
                <Chat
                    active={currentActiveChat}
                    handleChatOpen={handleChatOpen}
                    handleClose={handleClose}
                />
            </div>

            <Outlet />
            <LogInDialog />
            <SnackbarDialog />
        </div>
    );
}
