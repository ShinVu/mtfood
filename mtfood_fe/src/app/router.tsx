// Import library from react
import { createBrowserRouter } from "react-router-dom";

//Import pages of application
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import SignUpVerify from "../pages/Signup_verify";
import SignUpNewPassword from "../pages/Signup_password";
import ProductDetails from "../pages/Product_details";
import Profile from "../pages/Profile";
const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/signup/verify",
        element: <SignUpVerify />,
    },
    {
        path: "/signup/password",
        element: <SignUpNewPassword />,
    },
    {
        path: "/product/:id",
        element: <ProductDetails />,
    },
    {
        path: "/user/account",
        element: <Profile />,
    },
]);

export default router;
