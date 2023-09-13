import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import SignUp from "../pages/signup";
import NotFound from "../pages/notfound";
import DefaultLayout from "../pages/defaultlayout";
import GuestLayout from "../pages/guestlayout";
import Dashboard from "../pages/dashboard";
const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
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
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
