import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHook";
import { useEffect } from "react";

export default function LoginRedirect() {
    const { user, token } = useAppSelector((state) => state.authentication);
    const navigate = useNavigate();
    useEffect(() => {
        if (user && token) {
            navigate("/home");
        }
    }, [user, token]);
    return (
        <>
            <Outlet />
        </>
    );
}
