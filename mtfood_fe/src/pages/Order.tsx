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
import { pushOrder, setOrder } from "../features/order/orderSlice";
import { orderType } from "../models/order.model";
import { debounce } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress, Paper } from "@mui/material";
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
            <Tab label={t("waitingPayment")} value="waitingPayment" />
            <Tab label={t("preparing")} value="preparing" />
            <Tab label={t("waitingDelivery")} value="waitingDelivery" />
            <Tab label={t("delivering")} value="delivering" />
            <Tab label={t("delivered")} value="delivered" />
            <Tab label={t("canceled")} value="canceled" />
            <Tab label={t("return")} value="return" />
        </Tabs>
    );
}

export default function UserOrder() {
    const { t } = useTranslation();

    //Redux
    const { user } = useAppSelector((state) => state.authentication);
    const { orders } = useAppSelector((state) => state.order);
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
            //Reset offset, totallength and has more
            setOffset(0);
            setHasMore(false);
            setTotalLength(0);
            dispatch(setOrder([]));

            const payload = {
                customerId: user?.id,
                type: type,
                offset: 0,
                limit: limit,
                keyword: keyword,
            };

            axiosClient.post("/getOrders", payload).then(({ data }) => {
                const resultOrders: orderType[] = data.result.orders;
                const totalOrderLength: number = data.result.totalOrders;
                setTotalLength(totalOrderLength);
                //Change offset()
                setOffset(0 + limit);
                setHasMore(true);
                if (resultOrders && resultOrders.length > 0) {
                    dispatch(setOrder(resultOrders));
                } else if (resultOrders.length === 0) {
                    dispatch(setOrder([]));
                    setHasMore(false);
                }
            });
        };

        fetchOrders();
    }, [searchParams]);

    //set API
    const fetchMoreData = () => {
        if (orders && orders?.length >= totalLength) {
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

            axiosClient.post("/getOrders", payload).then(({ data }) => {
                const resultOrders: orderType[] = data.result.orders;

                //Increase offset
                setOffset(offset + limit);

                if (resultOrders && resultOrders.length >= 0) {
                    dispatch(pushOrder(resultOrders));
                } else {
                    setHasMore(false);
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
                            dataLength={orders?.length ?? 0}
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
                            {orders &&
                                orders.map((order) => (
                                    <OrderItem order={order} key={order.id} />
                                ))}
                        </InfiniteScroll>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
