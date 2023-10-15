// Import library from react
import { createBrowserRouter } from "react-router-dom";

//Import pages of application
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import SignUpVerify from "../pages/Signup_verify";
import SignUpNewPassword from "../pages/Signup_password";
import ProductDetails from "../pages/Product_details";
import Profile from "../pages/Profile";
import UserAddress from "../pages/Address";
import UserSeenProduct from "../pages/SeenProduct";
import UserLikedProduct from "../pages/LikedProduct";
import UserNotificationSetting from "../pages/NotificationSetting";
import UserNotification from "../pages/Notification";
import UserOrder from "../pages/Order";
import OrderDetail from "../pages/OrderDetail";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Product from "../pages/Product";

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
        path: "/product/details/:id",
        element: <ProductDetails />,
    },
    {
        path: "/user/account",
        element: <Profile />,
    },
    {
        path: "/user/address",
        element: <UserAddress />,
    },
    {
        path: "/user/seen",
        element: <UserSeenProduct />,
    },
    {
        path: "/user/liked",
        element: <UserLikedProduct />,
    },
    {
        path: "/user/notification/settings",
        element: <UserNotificationSetting />,
    },
    {
        path: "/user/notification",
        element: <UserNotification />,
    },
    {
        path: "/user/order/:type?",
        element: <UserOrder />,
    },
    {
        path: "/user/order/details/:id",
        element: <OrderDetail />,
    },
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/cart",
        element: <Cart />,
    },
    {
        path: "/checkout",
        element: <Checkout />,
    },
    { path: "/product/:type?", element: <Product /> },
]);

export default router;
