import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    setUser,
    setToken,
} from "../features/authentication/authenticationSlice";
export default function DefaultLayout() {
    const user = useSelector((state) => state.authentication.user);
    const dispatch = useDispatch();
    return (
        <div>
            {user}
            <div>
                <button onClick={() => dispatch(setUser({ user: "Dat" }))}>
                    Increase
                </button>
            </div>
            <Outlet />
        </div>
    );
}
