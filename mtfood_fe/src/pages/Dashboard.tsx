import { Fab } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="relative">
            <Fab
                color="primary"
                aria-label="add"
                className="absolute top-[75vh] right-2 w-8 h-4"
            >
                hello
            </Fab>

            <Outlet />
        </div>
    );
}
