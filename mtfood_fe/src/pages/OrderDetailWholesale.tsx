import { useTranslation } from "react-i18next";

import { colors } from "../../public/theme.js";
//Import components
import Header from "../components/header.js";
import Footer from "../components/footer.js";
import {
    ProfileNavigation,
    OrderStepper,
    OrderItemCard,
} from "../features/profile/index.js";
import {
    ContainedButton,
    OutlinedButton,
    TextButton,
} from "../components/button.js";
//Import MUI
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    Paper,
    Radio,
    RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook.js";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { orderType, orderWholesaleType } from "../models/order.model.js";
import axiosClient from "../../axios-client.js";
import { setAddress } from "../features/authentication/authenticationSlice.js";
import { styled as mui_styled } from "@mui/material/styles";
import { changePriceFormat, getOrderBillingValue } from "../utils/index.js";
import OrderWholesaleItemsDetailCard from "../features/profile/components/orderItemWholesaleDetailCard.js";
import {
    MapWholesaleHeader,
    MapWholesaleHeaderDetail,
    MapWholesaleToText,
    order_wholesale_states,
} from "../features/order/components/message_wholesale.js";
import AddressDialog from "../features/profile/addressDialog.js";
import { current } from "@reduxjs/toolkit";

const StyledTableRow = mui_styled(TableRow)(({ theme }) => ({
    "& td, & th": {
        border: 0,
    },
}));

function OrderSummary({ order }: { order: orderWholesaleType }) {
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
                                    {t("total")}
                                </span>
                            </TableCell>
                            <TableCell align="right">
                                <p className="text-lg font-medium text-black">
                                    {changePriceFormat(order.total)}đ
                                </p>
                            </TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell>
                                <span className="text-gray-100 font-medium">
                                    {t("totalPaid")}
                                </span>
                            </TableCell>
                            <TableCell align="right">
                                <p className="text-lg font-medium text-black">
                                    {/* {changePriceFormat(billing.shippingFee)}đ */}
                                    {changePriceFormat(order.total_paid)}đ
                                </p>
                            </TableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

function MapToButton({
    order,
    handleOpen,
    handleClose,
    handleAddressOpen,
    handleAddressClose,
}: {
    order: orderType;
    handleOpen: () => void;
    handleClose: () => void;
    handleAddressOpen: () => void;
    handleAddressClose: () => void;
}) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.authentication);
    const cancelOrder = () => {
        const payload = {
            customerId: user.id,
            orderId: order.id,
        };
        axiosClient
            .post("/cancelOrder", payload)
            .then(({ data }) => navigate(0));
    };

    if (order_wholesale_states.indexOf(order.status) <= 2) {
        return (
            <div className="flex flex-col space-y-4">
                <ContainedButton className=" bg-primary_main">
                    {t("Contact")}
                </ContainedButton>

                <OutlinedButton onClick={handleOpen}>
                    {t("changePaymentMethod")}
                </OutlinedButton>
                <OutlinedButton onClick={handleAddressOpen}>
                    {t("changeAddress")}
                </OutlinedButton>
            </div>
        );
    }
}

function ChangePaymentMethodDialog(props) {
    const { orderId, open, handleOpen, handleClose } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.authentication);
    const [value, setValue] = useState<string>("cod");

    const changePaymentMethod = () => {
        const payload = {
            customerId: user.id,
            orderSummaryId: orderId,
            paymentMethod: value,
        };
        axiosClient
            .post("/changePaymentMethodWholesale", payload)
            .then(({ data }) => navigate(0));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };
    return (
        <Dialog open={open}>
            <DialogTitle>{t("choosePaymentMethod")}</DialogTitle>
            <DialogContent>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                    >
                        <FormControlLabel
                            value="cod"
                            control={<Radio />}
                            label="Thanh toán khi nhận hàng"
                        />
                        <FormControlLabel
                            value="momo"
                            control={<Radio />}
                            label="Ví Momo"
                        />
                        <FormControlLabel
                            value="vnpay"
                            control={<Radio />}
                            label="Ví VNPay"
                        />
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{t("cancel")}</Button>
                <Button onClick={changePaymentMethod} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default function OrderDetailWholesale() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user, currentAddress, addresses } = useAppSelector(
        (state) => state.authentication
    );
    const dispatch = useAppDispatch();
    const { id } = useParams();

    const getFullAddress = () => {
        if (order && order.address) {
            const fullAddress = order.address;

            return `${fullAddress.address}, ${fullAddress.ward.full_name}, ${fullAddress.ward.district.full_name}, ${fullAddress.ward.district.province.full_name}`;
        }
    };

    const [order, setOrder] = useState<orderWholesaleType | null>(null);
    useEffect(() => {
        const fetchOrder = () => {
            const payload = {
                customerId: user.id,
                orderSummaryId: id,
            };
            axiosClient
                .post("/getWholesaleOrderDetail", payload)
                .then(({ data }) => {
                    const newOrder: orderWholesaleType = data.result.order;
                    console.log(newOrder);
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

    //Change payment method state

    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //Change address state

    const [openAddress, setOpenAddress] = useState<boolean>(false);

    const handleAddressOpen = () => {
        setOpenAddress(true);
    };

    const handleAddressClose = () => {
        setOpenAddress(false);
    };
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
                            </div>

                            <Divider className="mt-4 mb-4" />
                            <div className="flex flex-row justify-between p-4">
                                <div className="flex flex-col justify-between">
                                    <div>
                                        <p className="my-0 text-black text-lg">
                                            {t("orderCode")}:{" "}
                                            <span className="font-bold">
                                                #{order.order_code}
                                            </span>
                                        </p>
                                        <div className="flex flex-row">
                                            <p className="text-lg my-0">
                                                {t("status")}:{" "}
                                            </p>
                                            <MapWholesaleHeaderDetail
                                                orderStatus={order.status}
                                            />
                                        </div>
                                    </div>
                                    <MapWholesaleToText order={order} />
                                </div>
                                <div className="flex flex-col justify-evenly">
                                    <MapToButton
                                        order={order}
                                        handleOpen={handleOpen}
                                        handleClose={handleClose}
                                        handleAddressOpen={handleAddressOpen}
                                        handleAddressClose={handleAddressClose}
                                    />
                                    <ChangePaymentMethodDialog
                                        open={open}
                                        orderId={order.id}
                                        handleOpen={handleOpen}
                                        handleClose={handleClose}
                                    />
                                    <AddressDialog
                                        open={openAddress}
                                        handleClose={handleAddressClose}
                                        isOrder={true}
                                        orderType={"wholesale"}
                                        orderId={order.id}
                                    />
                                </div>
                            </div>
                        </Paper>
                        <div className="flex flex-row flex-1 space-x-4">
                            <Paper elevation={2} className="w-1/3 p-4">
                                <h5 className="text-primary_main text-base uppercase my-0">
                                    {t("orderAddress")}
                                </h5>

                                <div className="mt-3">
                                    <p className="text-black font-medium">
                                        {order.address && order.address?.name}
                                    </p>
                                    <p className="text-gray-100">
                                        {order.address &&
                                            order.address?.phone_number}
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
                            <OrderWholesaleItemsDetailCard
                                orderDetails={order.order_summary_detail}
                            />
                            <OrderSummary order={order} />
                        </Paper>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
