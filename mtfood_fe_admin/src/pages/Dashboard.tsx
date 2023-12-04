import { Box, Divider, Fab, Paper, Popper } from "@mui/material";
import { Outlet } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import { colors } from "../../public/theme";
import { useState } from "react";
import Chat from "../components/chatBox";
import LogInDialog from "../components/logInDialog";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import SnackbarDialog from "../components/snackbar";
import AIChat from "../components/aiChatBox";
import FullScreenAIChat from "./fullScreenAIChat";

export default function Dashboard() {
    return (
        <div>
            <Outlet />
        </div>
    );
}
