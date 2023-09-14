import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../index.css";
export default function DefaultLayout() {
    const { user: user, token: token } = useSelector(
        (state) => state.authentication
    );

    if (!token) {
        return <Navigate to="/login" />;
    }
    return (
        <div>
            <h1 className="text-3xl font-bold text-red-500 underline text-center">
                {user}
            </h1>
            <Outlet />
        </div>
    );
}
