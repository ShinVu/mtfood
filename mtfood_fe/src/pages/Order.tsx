import * as React from "react";

//Import i18
import { useTranslation } from "react-i18next";
//Import components
import Header from "../components/header";
import Footer from "../components/Footer";
import { ProfileNavigation, OrderSearchBar } from "../features/profile";

//Import MUI
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

//Import React router
import PropTypes from "prop-types";
import {
    MemoryRouter,
    Route,
    Routes,
    Link,
    matchPath,
    useLocation,
} from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { OrderItem } from "../features/profile";

//Import colors

const user = {
    address: "Bạch Đằng, Quận Tân Bình, TP.HCM",
    avatar: "./assets/image_15.png",
    name: "Lorem",
};

const orders = [
    {
        status: "canceled",
        totalAmount: "đ500.000",
        products: [
            { name: "Khô bò", basePrice: "đ1.000.000", price: "đ500.000" },
        ],
    },
];
function Router(props) {
    const { children } = props;
    if (typeof window === "undefined") {
        return <StaticRouter location="/drafts">{children}</StaticRouter>;
    }

    return (
        <MemoryRouter initialEntries={["/drafts"]} initialIndex={0}>
            {children}
        </MemoryRouter>
    );
}

Router.propTypes = {
    children: PropTypes.node,
};

function useRouteMatch(patterns) {
    const { pathname } = useLocation();
    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(pattern, pathname);
        console.log(possibleMatch);
        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }
    return null;
}

function MyTabs() {
    const { t } = useTranslation();
    // You need to provide the routes in descendant order.
    // This means that if you have nested routes like:
    // users, users/new, users/edit.
    // Then the order should be ['users/add', 'users/edit', 'users'].
    const routeMatch = useRouteMatch(["/user/order/:type"]);
    const currentTab = routeMatch?.pattern?.path
        ? routeMatch.params.type
        : undefined;
    return (
        <Tabs value={currentTab} variant="fullWidth" className="flex w-full">
            <Tab
                label={t("all")}
                value="0"
                to="/user/order/0"
                component={Link}
            />
            <Tab
                label={t("waitingPayment")}
                value="1"
                to="/user/order/1"
                component={Link}
            />
            <Tab
                label={t("preparing")}
                value="2"
                to="/user/order/2"
                component={Link}
            />
            <Tab
                label={t("waitingDelivery")}
                value="3"
                to="/user/order/3"
                component={Link}
            />
            <Tab
                label={t("delivered")}
                value="4"
                to="/user/order/4"
                component={Link}
            />
            <Tab
                label={t("canceled")}
                value="5"
                to="/user/order/5"
                component={Link}
            />
            <Tab
                label={t("return")}
                value="6"
                to="/user/order/6"
                component={Link}
            />
        </Tabs>
    );
}

export default function UserOrder() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-1 flex-col">
            <Header />
            <div className="flex flex-row flex-1 w-full px-4 py-12 bg-background_main">
                <ProfileNavigation user={user} />
                <div className="flex flex-col flex-1 px-4">
                    <div className="flex w-full bg-white">
                        <MyTabs />
                    </div>
                    <div className="mt-4">
                        <OrderSearchBar />
                    </div>
                    <div className="flex space-y-4 mt-8">
                        {orders.map((order) => (
                            <OrderItem order={order} />
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
