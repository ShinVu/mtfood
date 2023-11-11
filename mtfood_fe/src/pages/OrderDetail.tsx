import { useTranslation } from "react-i18next";

import { colors } from "../../public/theme.js";
//Import components
import Header from "../components/header";
import Footer from "../components/footer";
import {
    ProfileNavigation,
    OrderStepper,
    OrderItemCard,
} from "../features/profile";
import {
    ContainedButton,
    OutlinedButton,
    TextButton,
} from "../components/button.jsx";
//Import MUI
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Divider } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook.js";
import { MapHeader, MapToText } from "../features/order/components/message..js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { orderType } from "../models/order.model.js";
import axiosClient from "../../axios-client.js";
import { setAddress } from "../features/authentication/authenticationSlice.js";

const order = {
    status: "canceled",
    totalAmount: "đ500.000",
    code: "54323123",
    products: [
        {
            name: "Khô bò",
            basePrice: "đ1.000.000",
            price: "đ500.000",
            quantity: "5",
        },
        {
            name: "Khô bò",
            basePrice: "đ1.000.000",
            price: "đ500.000",
            quantity: "5",
        },
    ],
};
export default function OrderDetail() {
    const { t } = useTranslation();
    const { user, currentAddress, addresses } = useAppSelector(
        (state) => state.authentication
    );
    const dispatch = useAppDispatch();
    const { id } = useParams();

    const getFullAddress = () => {
        if (currentAddress) {
            return `${currentAddress.address}, ${currentAddress.ward_name}, ${currentAddress.district_name}, ${currentAddress.province_name}`;
        }
    };

    const [order, setOrder] = useState<orderType | null>(null);
    useEffect(() => {
        const fetchOrder = () => {
            const payload = {
                customerId: user.id,
                orderId: id,
            };
            axiosClient
                .post("/getOrderDetail", payload)
                .then(({ data }) => {
                    const newOrder: orderType = data.result.order;
                    setOrder(newOrder);
                })
                .catch(({ response }) => {
                    console.log(response);
                });
        };
        if (!order) {
            fetchOrder();
        }
    }, []);

    useEffect(() => {
        const fetchAddress = async () => {
            const payload = {
                customerId: user.id,
            };
            const response = await axiosClient.post("/getAddress", payload);
            const newAddress = response.data.result.address;

            dispatch(setAddress(newAddress));
        };
        if (!addresses) {
            fetchAddress();
        }
    }, [addresses]);
    return (
        <div className="flex flex-1 flex-col">
            <Header />
            <div className="flex flex-row flex-1 w-full px-4 py-12 bg-background_main">
                <ProfileNavigation user={user} />
                {order && (
                    <div className="flex flex-col space-y-4 flex-1">
                        <div className="flex flex-col flex-1 p-4 bg-white">
                            <div className="flex flex-row w-full justify-between ">
                                <div className="flex flex-row items-center">
                                    <KeyboardArrowLeftIcon />
                                    <p className="text-gray-100 text-base font-normal my-0">
                                        {t("back")}
                                    </p>
                                </div>
                                <div className="flex flex-row items-center  divide-x-2">
                                    <div className="px-2">
                                        <p className="my-0 text-gray-100 text-base">
                                            {t("orderCode")}: {order.code}
                                        </p>
                                    </div>
                                    <div className="px-2">
                                        <p className="my-0 text-base">
                                            <MapHeader
                                                orderStatus={order.status}
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="my-8">
                                <OrderStepper />
                            </div>
                            <Divider className="mt-4 mb-4" />
                            <div className="flex flex-row justify-between px-4">
                                <div>
                                    <MapToText order={order} />
                                </div>
                                <div className="flex flex-col space-y-4">
                                    <ContainedButton className=" bg-primary_main">
                                        Liên hệ
                                    </ContainedButton>
                                    <OutlinedButton>
                                        Thanh toán ngay
                                    </OutlinedButton>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row flex-1 space-x-4">
                            <div className="w-1/3 bg-white items-center justify-center p-4">
                                <h5 className="text-primary_main text-base uppercase my-0">
                                    {t("orderAddress")}
                                </h5>

                                <div className="mt-3">
                                    <p className="text-black font-medium">
                                        {currentAddress && currentAddress?.name}
                                    </p>
                                    <p className="text-gray-100">
                                        {currentAddress &&
                                            currentAddress?.phone_number}
                                    </p>
                                    <p className="text-gray-100">
                                        {getFullAddress()}
                                    </p>
                                </div>
                            </div>
                            <div className="w-1/3 bg-white items-center justify-center p-4">
                                <h5 className="text-primary_main text-base uppercase my-0">
                                    {t("orderDelivery")}
                                </h5>

                                <div className="mt-3">
                                    <p className="text-black font-medium">
                                        {user.name}
                                    </p>
                                    <p className="text-gray-100">
                                        {user.phoneNumber}
                                    </p>
                                    <p className="text-gray-100">
                                        {user.address}
                                    </p>
                                </div>
                            </div>
                            <div className="w-1/3 bg-white items-center justify-center p-4">
                                <h5 className="text-primary_main text-base uppercase my-0">
                                    {t("orderPayment")}
                                </h5>

                                <div className="mt-3">
                                    <p className="text-black font-medium">
                                        {user.name}
                                    </p>
                                    <p className="text-gray-100">
                                        {user.phoneNumber}
                                    </p>
                                    <p className="text-gray-100">
                                        {user.address}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-1 p-4 bg-white">
                            {/* <OrderItemCard products={order.products} /> */}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
