import * as React from "react";

//Import i18
import { useTranslation } from "react-i18next";
//Import components
import Header from "../components/header";
import Footer from "../components/footer";
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
    useSearchParams,
} from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { OrderItem } from "../features/profile";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import axiosClient from "../../axios-client";
import {
    pushOrder,
    pushWholesaleOrder,
    setOrder,
    setWholesaleOrder,
} from "../features/order/orderSlice";
import { orderType, orderWholesaleType } from "../models/order.model";
import { debounce } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress, Paper } from "@mui/material";
import OrderWholesaleItem from "../features/profile/components/orderWholesaleItem";
//Import colors

function MyTabs() {
    const { t } = useTranslation();
    // You need to provide the routes in descendant order.
    // This means that if you have nested routes like:
    // users, users/new, users/edit.
    // Then the order should be ['users/add', 'users/edit', 'users'].
    const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = React.useState<string>(
        searchParams.get("type") ?? "all"
    );

    const handleTabClick = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        searchParams.set("type", newValue);
        setSearchParams(searchParams);
    };
    return (
        <Tabs
            value={value}
            onChange={handleTabClick}
            variant="fullWidth"
            className="flex w-full"
        >
            <Tab label={t("all")} value="all" />
            <Tab label={t("waitingConfirm")} value="waiting_confirm" />
            <Tab label={t("preparing")} value="in_process" />
            <Tab label={t("completed")} value="completed" />
        </Tabs>
    );
}

export default function UserOrderWholesale() {
    const { t } = useTranslation();

    //Redux
    const { user } = useAppSelector((state) => state.authentication);
    const { wholesaleOrders } = useAppSelector((state) => state.order);
    const dispatch = useAppDispatch();

    const [searchParams] = useSearchParams();

    //Infinite scroll state
    const [hasMore, setHasMore] = React.useState<boolean>(true);
    const [totalLength, setTotalLength] = React.useState<number>(0);

    //Offset and limit
    const [offset, setOffset] = React.useState<number>(0);
    const limit = 10;
    React.useEffect(() => {
        const fetchOrders = () => {
            const type = searchParams.get("type") ?? "all";
            const keyword = searchParams.get("keyword");
            //Reset offset and has more
            setOffset(0);
            setHasMore(true);
            dispatch(setWholesaleOrder([]));

            const payload = {
                customerId: user?.id,
                type: type,
                offset: 0,
                limit: limit,
                keyword: keyword,
            };

            axiosClient
                .post("/getWholesaleOrders", payload)
                .then(({ data }) => {
                    const resultOrders: orderWholesaleType[] =
                        data.result.orders;

                    const totalOrderLength: number = data.result.totalOrders;
                    setTotalLength(totalOrderLength);
                    //Change offset()
                    setOffset(offset + limit);
                    if (resultOrders && resultOrders.length > 0) {
                        dispatch(setWholesaleOrder(resultOrders));
                    } else if (resultOrders.length === 0) {
                        dispatch(setWholesaleOrder([]));
                        setHasMore(false);
                    }
                })
                .catch(({ response }) => console.log(response));
        };

        fetchOrders();
    }, [searchParams]);

    //set API
    const fetchMoreData = () => {
        if (wholesaleOrders && wholesaleOrders?.length >= totalLength) {
            setHasMore(false);
            setOffset(0);
            return;
        } else {
            const type = searchParams.get("type") ?? "all";
            const keyword = searchParams.get("keyword");
            const payload = {
                customerId: user?.id,
                type: type,
                offset: offset,
                limit: limit,
                keyword: keyword,
            };

            axiosClient
                .post("/getWholesaleOrders", payload)
                .then(({ data }) => {
                    const resultOrders: orderWholesaleType[] =
                        data.result.orders;
                    //Increase offset
                    setOffset(offset + limit);

                    if (resultOrders && resultOrders.length >= 0) {
                        dispatch(pushWholesaleOrder(resultOrders));
                    }
                });
        }
    };

    return (
        <div className="flex flex-1 flex-col">
            <Header />
            <div className="flex flex-row flex-1 w-full px-4 py-12 bg-background_main">
                <ProfileNavigation user={user} />
                <div className="flex flex-col flex-1 px-4">
                    <Paper className="w-full">
                        <MyTabs />
                    </Paper>
                    <div className="mt-4">
                        <OrderSearchBar />
                    </div>
                    <div className="mt-4">
                        {searchParams.get("keyword") && (
                            <p>
                                {t("searchResultFor")}:
                                <span className="text-black font-bold ml-5">
                                    {searchParams.get("keyword")}
                                </span>
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col" id="scrollableDiv">
                        <InfiniteScroll
                            dataLength={wholesaleOrders?.length ?? 0}
                            next={fetchMoreData}
                            hasMore={hasMore}
                            loader={
                                <div className="flex flex-1 items-center justify-center">
                                    <CircularProgress />
                                </div>
                            }
                            endMessage={
                                <p className="mt-5 text-gray-100 text-base">
                                    <b>Không có đơn hàng nào</b>
                                </p>
                            }
                            className="space-y-4"
                        >
                            {wholesaleOrders &&
                                wholesaleOrders.map((order) => (
                                    <OrderWholesaleItem
                                        order={order}
                                        key={order.id}
                                    />
                                ))}
                        </InfiniteScroll>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
