// Import library from react
import { createBrowserRouter, Navigate } from "react-router-dom";

//Import pages of application
import Login from "../pages/login";
import SignUp from "../pages/signup";
import SignUpVerify from "../pages/signup_verify";
import SignUpNewPassword from "../pages/signup_password";
import ProductDetails from "../pages/product_details";
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
import ForgetPassword from "../pages/forgetPassword";
import ForgetVerify from "../pages/forget_verify";
import ForgetNewPassword from "../pages/forget_password";
import Dashboard from "../pages/Dashboard";
import LoginRedirect from "../pages/LoginRedirect";
import AddProduct from "../pages/addProductTestingFile";
import AddCategory from "../pages/addCategoryTestingFile";
import ProductWholesale from "../pages/ProductWholesale";
import ProductWholesaleDetails from "../pages/product_details_wholesale";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginRedirect />,
        children: [
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
                path: "/forgetPassword",
                element: <ForgetPassword />,
            },
            {
                path: "/forgetPassword/verify",
                element: <ForgetVerify />,
            },
            {
                path: "/forgetPassword/newPassword",
                element: <ForgetNewPassword />,
            },
        ],
    },
    {
        path: "/",
        element: <Dashboard />,
        children: [
            {
                path: "product/details/:id",
                element: <ProductDetails />,
            },
            {
                path: "productWholesale/details/:id",
                element: <ProductWholesaleDetails />,
            },
            {
                path: "user/account",
                element: <Profile />,
            },
            {
                path: "user/address",
                element: <UserAddress />,
            },
            {
                path: "user/seen",
                element: <UserSeenProduct />,
            },
            {
                path: "user/liked",
                element: <UserLikedProduct />,
            },
            {
                path: "user/notification/settings",
                element: <UserNotificationSetting />,
            },
            {
                path: "user/notification",
                element: <UserNotification />,
            },
            {
                path: "user/order/:type?",
                element: <UserOrder />,
            },
            {
                path: "user/order/details/:id",
                element: <OrderDetail />,
            },
            {
                path: "",
                element: <Navigate to="/home" replace />,
            },
            {
                path: "home",
                element: <Home />,
            },
            {
                path: "cart",
                element: <Cart />,
            },
            {
                path: "checkout",
                element: <Checkout />,
            },
            {
                path: "product",
                element: <Product />,
            },
            {
                path: "productWholesale",
                element: <ProductWholesale />,
            },
            {
                path: "addProductTesting",
                element: <AddProduct />,
            },
            {
                path: "addCategoryTesting",
                element: <AddCategory />,
            },
        ],
    },

    // { path: "/product/cat/:catId", element: <Product /> },
    // { path: "/product/cat", element: <Navigate to="/product/cat/0" replace /> },
    // { path: "/product/tag/:tagId", element: <Product /> },
    // { path: "/product/tag", element: <Navigate to="/product/tag/0" replace /> },
]);

export default router;
