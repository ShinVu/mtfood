import { Box, Fab, Paper, Popper } from "@mui/material";
import { Outlet } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import { colors } from "../../public/theme";
import { useState } from "react";
import Chat from "../components/chatBox";
import LogInDialog from "../components/logInDialog";
import { useAppDispatch } from "../hooks/reduxHook";
import SnackbarDialog from "../components/snackbar";

export default function Dashboard() {
    return (
        <div>
            <Chat />
            <Outlet />
            <LogInDialog />
            <SnackbarDialog />
        </div>
    );
}
