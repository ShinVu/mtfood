// Import library from react
import { createBrowserRouter, Navigate } from "react-router-dom";

//Import pages of application
import Login from "../pages/login";
import SignUp from "../pages/signup";
import Product from "../pages/Product";

import Dashboard from "../pages/Dashboard";

import DashboardMain from "../pages/dashboard_main";

const router = createBrowserRouter([
    {
        path: "/",

        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
        ],
    },
    {
        path: "/",
        element: <Dashboard />,
        children: [
            {
                path: "/dashboard",
                element: <DashboardMain />,
            },
            {
                path: "/product",
                element: <Product />,
            },
        ],
    },
]);

export default router;
