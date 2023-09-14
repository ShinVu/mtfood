import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
export default function GuestLayout() {
    const { user: user, token: token } = useSelector(
        (state) => state.authentication
    );
    if (token) {
        return <Navigate to="/dashboard" />;
    }
    return (
        <div>
            <Outlet />
        </div>
    );
}
