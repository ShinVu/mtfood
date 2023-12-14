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
import {
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook.js";
import {
    MapHeader,
    MapToText,
    order_states,
} from "../features/order/components/message..js";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { orderType } from "../models/order.model.js";
import axiosClient from "../../axios-client.js";
import { setAddress } from "../features/authentication/authenticationSlice.js";
import { styled as mui_styled } from "@mui/material/styles";
import { changePriceFormat, getOrderBillingValue } from "../utils/index.js";

const StyledTableRow = mui_styled(TableRow)(({ theme }) => ({
    "& td, & th": {
        border: 0,
    },
}));

function OrderSummary({ order }: { order: orderType }) {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-end  mt-8">
            <div>
                <Table>
                    <TableBody>
                        <StyledTableRow>
                            <TableCell className="w-96">
                                <span className="text-gray-100 font-medium">
                                    {" "}
                                    {t("subTotal")}
                                </span>
                            </TableCell>
                            <TableCell align="right">
                                <p className="text-lg font-medium text-black">
                                    {changePriceFormat(order.subtotal)}đ
                                </p>
                            </TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell>
                                <span className="text-gray-100 font-medium">
                                    {t("deliveryFee")}
                                </span>
                            </TableCell>
                            <TableCell align="right">
                                <p className="text-lg font-medium text-black">
                                    +
                                    {/* {changePriceFormat(billing.shippingFee)}đ */}
                                    {changePriceFormat(order.shipping_subtotal)}
                                    đ
                                </p>
                            </TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell>
                                <span className="text-gray-100 font-medium">
                                    {t("totalProductDiscount")}
                                </span>
                            </TableCell>
                            <TableCell align="right">
                                <p className="text-lg font-medium text-black">
                                    {/* {changePriceFormat(
                                        billing.shippingDiscount
                                    )} */}
                                    -
                                    {changePriceFormat(order.products_discount)}
                                    đ
                                </p>
                            </TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell>
                                <span className="text-gray-100 font-medium">
                                    {t("voucherDiscount")}
                                </span>
                            </TableCell>
                            <TableCell align="right">
                                <p className="text-lg font-medium text-black">
                                    {/* {" "}
                                    {changePriceFormat(billing.voucherDiscount)} */}
                                    -
                                    {changePriceFormat(
                                        order.voucher_discount
                                    ) ?? "0đ"}
                                    đ
                                </p>
                            </TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell>
                                <span className="text-gray-100 font-medium">
                                    {t("total")}
                                </span>
                            </TableCell>
                            <TableCell align="right">
                                <span className="text-2xl font-bold text-red_main">
                                    {/* {changePriceFormat(billing.total)}đ */}
                                    {changePriceFormat(order.total)}đ
                                </span>
                            </TableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

function OrderCancel({ orderStatus }: { orderStatus: string }) {
    const { t } = useTranslation();
    if (order_states.indexOf(orderStatus) >= 12) {
        return (
            <Paper elevation={0} className="w-full p-2 bg-orange-light">
                <p>{t("orderIsReturned")}</p>
            </Paper>
        );
    } else if (order_states.indexOf(orderStatus) >= 9) {
        return (
            <Paper elevation={0} className="w-full p-2 bg-orange-light">
                <p>{t("orderIsCanceled")}</p>
            </Paper>
        );
    }
}

function MapToButton({ order }: { order: orderType }) {
    const { t } = useTranslation();

    if (order.status === order_states[1]) {
        return (
            <div className="flex flex-col space-y-4">
                <ContainedButton className=" bg-primary_main">
                    {t("payNow")}
                </ContainedButton>
                <OutlinedButton>{t("Contact")}</OutlinedButton>
                <OutlinedButton>{t("CancelOrder")}</OutlinedButton>
            </div>
        );
    }
    if (
        order_states.indexOf(order.status) == 7 ||
        order_states.indexOf(order.status) == 8
    ) {
        return (
            <div className="flex flex-col space-y-4">
                <ContainedButton className=" bg-primary_main">
                    {t("rateNow")}
                </ContainedButton>
                <OutlinedButton>{t("Contact")}</OutlinedButton>
            </div>
        );
    }
    if (order_states.indexOf(order.status) <= 5) {
        return (
            <div className="flex flex-col space-y-4">
                <ContainedButton className=" bg-primary_main">
                    {t("Contact")}
                </ContainedButton>
                <OutlinedButton>{t("CancelOrder")}</OutlinedButton>
            </div>
        );
    }
    if (order_states.indexOf(order.status) >= 6) {
        return (
            <div className="flex flex-col space-y-4">
                <ContainedButton className=" bg-primary_main">
                    {t("Contact")}
                </ContainedButton>
            </div>
        );
    }
}
export default function OrderDetail() {
    const { t } = useTranslation();
    const navigate = useNavigate();
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
                .catch();
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
                        <Paper elevation={2} className="p-4">
                            <div className="flex flex-row w-full justify-between ">
                                <div
                                    className="flex flex-row items-center cursor-pointer"
                                    onClick={() => navigate(-1)}
                                >
                                    <KeyboardArrowLeftIcon />
                                    <p className="text-gray-100 text-base font-normal my-0">
                                        {t("back")}
                                    </p>
                                </div>
                                <div className="flex flex-row items-center  divide-x-2">
                                    <div className="px-2">
                                        <p className="my-0 text-gray-100 text-base">
                                            {t("orderCode")}: #
                                            {order.order_code}
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
                                {order_states.indexOf(order.status) > 8 ? (
                                    <OrderCancel orderStatus={order.status} />
                                ) : (
                                    <OrderStepper order={order} />
                                )}
                            </div>
                            <Divider className="mt-4 mb-4" />
                            <div className="flex flex-row justify-between px-4">
                                <MapToText order={order} />
                                <MapToButton order={order} />
                            </div>
                        </Paper>
                        <div className="flex flex-row flex-1 space-x-4">
                            <Paper elevation={2} className="w-1/3 p-4">
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
                            </Paper>
                            <Paper elevation={2} className="w-1/3 p-4">
                                <h5 className="text-primary_main text-base uppercase my-0">
                                    {t("orderDelivery")}
                                </h5>

                                <div className="mt-3">
                                    <p className="text-black font-medium">
                                        {order.delivery_method == "fast" &&
                                            "Giao hàng nhanh"}
                                    </p>
                                </div>
                            </Paper>
                            <Paper elevation={2} className="w-1/3 p-4">
                                <h5 className="text-primary_main text-base uppercase my-0">
                                    {t("orderPayment")}
                                </h5>

                                <div className="mt-3">
                                    <p className="text-black font-medium">
                                        {t(order.payment_method)}
                                    </p>
                                </div>
                            </Paper>
                        </div>
                        <Paper elevation={3} className="p-2">
                            <OrderItemCard orderDetails={order.order_detail} />
                            <OrderSummary order={order} />
                        </Paper>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
