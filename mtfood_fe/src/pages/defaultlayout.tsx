import React from "react";

// Import library from react router
import { Outlet, Navigate } from "react-router-dom";

// Import library from react redux
import { useSelector, useDispatch } from "react-redux";

// Import tailwind css
import "../index.css";

// Import library from bootstrap
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export default function DefaultLayout() {
    const { user: user, token: token } = useSelector(
        (state) => state.authentication
    );

    if (!token) {
        return <Navigate to="/login" />;
    }
    return (
        <div>
            <Button>Hello</Button>
            <Outlet />
        </div>
    );
}
