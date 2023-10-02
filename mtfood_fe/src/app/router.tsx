// Import library from react
import { createBrowserRouter } from "react-router-dom";

//Import pages of application
import Login from "../pages/login";
import SignUp from "../pages/signup";
import SignUpVerify from "../pages/signup_verify";
import SignUpNewPassword from "../pages/signup_password";
import ProductDetails from "../pages/product_details";
const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <SignUp/>
    },
    {
        path: "/signup/verify",
        element: <SignUpVerify/>
    },
    {
        path: "/signup/password",
        element: <SignUpNewPassword/>
    },
    {
        path: "/product/:id",
        element: <ProductDetails/>
    }
 
]);

export default router;
