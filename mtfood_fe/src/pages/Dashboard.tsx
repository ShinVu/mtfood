import { Box, Fab, Paper, Popper } from "@mui/material";
import { Outlet } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import { colors } from "../../public/theme";
import { useState } from "react";
import Chat from "../components/chatBox";

export default function Dashboard() {
    return (
        <div>
            <Chat />
            <Outlet />
        </div>
    );
}
