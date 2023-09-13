import { Outlet } from "react-router-dom";

export default function GuestLayout() {
    return (
        <div>
            guest layout
            <Outlet />
        </div>
    );
}
