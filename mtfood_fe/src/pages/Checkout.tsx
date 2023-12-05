import React, { forwardRef, useEffect, useRef, useState } from "react";
//Import MUI
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Divider,
    TextField,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { RiDeleteBin6Line } from "react-icons/ri";
import { styled as mui_styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { BiSolidDiscount } from "react-icons/bi";
import { FaMoneyBills } from "react-icons/fa6";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
//Import color
import { colors } from "../../public/theme.js";
//Import components
import Footer from "../components/footer";
import HeaderCheckout from "../components/headerCheckout";
import {
    ContainedButton,
    OutlinedButton,
    TextButton,
} from "../components/button.jsx";
import { AddAddressDialog } from "../features/profile/index.js";
import Popover from "@mui/material/Popover";
//Import i18-n
import { useTranslation } from "react-i18next";

//lodash
import { debounce } from "@mui/material/utils";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook.js";
import axiosClient from "../../axios-client.js";
import { setAddress } from "../features/authentication/authenticationSlice.js";
import AddressDialog from "../features/profile/addressDialog.js";
import { current } from "@reduxjs/toolkit";
import { productCart } from "../models/product.model.js";
import { changePriceFormat, getSubTotal } from "../utils/index.js";
import usePriceCheckout from "../hooks/usePriceCheckout.js";
import VoucherDialog from "../components/voucherDialog.js";

const StyledTableRow = mui_styled(TableRow)(({ theme }) => ({
    "& td, & th": {
        border: 0,
    },
}));

const products = [
    {
        id: 1,
        name: "Khô bò",
        basePrice: "đ1.000.000",
        quantity: "12",
        price: "đ500.000",
    },
    {
        id: 1,
        name: "Khô bò",
        basePrice: "đ1.000.000",
        quantity: "12",
        price: "đ500.000",
    },
    {
        id: 1,
        name: "Khô bò",
        basePrice: "đ1.000.000",
        quantity: "12",
        price: "đ500.000",
    },
];

function CheckoutAddress() {
    const { t } = useTranslation();

    const { addresses, user, currentAddress } = useAppSelector(
        (state) => state.authentication
    );
    const dispatch = useAppDispatch();
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

    //Address dialog state
    const [open, setOpen] = useState<boolean>(false);

    const handleModalOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const getFullAddress = () => {
        return `${currentAddress?.address}, ${currentAddress?.ward_name}, ${currentAddress?.district_name}, ${currentAddress?.province_name}`;
    };
    return (
        <div className="flex flex-col flex-1 bg-white py-4 px-10">
            <h5 className="text-primary_main text-base uppercase my-0">
                {t("orderAddress")}
            </h5>
            <div className="flex flex-1 justify-between items-center mt-4">
                <div className="flex flex-col">
                    <p className="font-medium text-sm my-0">
                        {currentAddress?.name}
                    </p>
                    <p className="font-medium text-sm my-0">
                        {currentAddress?.phone_number}
                    </p>
                </div>
                <p className="font-normal text-sm my-0">{getFullAddress()}</p>
                <p className="text-primary_main normal-case my-0 text-sm">
                    {currentAddress?.default ? t("default") : <></>}
                </p>
                <TextButton onClick={handleModalOpen}>
                    <span className="normal-case text-blue">{t("change")}</span>
                </TextButton>
            </div>
            <AddressDialog
                open={open}
                handleModalOpen={handleModalOpen}
                handleClose={handleClose}
            />
        </div>
    );
}

function CheckoutDelivery() {
    const { t } = useTranslation();
    const [selectedValue, setSelectedValue] = React.useState("fast");

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div className="flex flex-col flex-1 bg-white p-4">
            <h5 className=" text-base uppercase my-0 px-3 font-semibold">
                {t("chooseDeliveryOption")}
            </h5>
            <div className="mt-4 w-fit">
                <Table size="small">
                    <TableBody>
                        <StyledTableRow>
                            <TableCell align="left">
                                <div className="-ml-3">
                                    <Radio
                                        checked={selectedValue === "fast"}
                                        onChange={handleChange}
                                        value="fast"
                                        name="radio-buttons"
                                        inputProps={{ "aria-label": "fast" }}
                                    />
                                    <span className="text-sm text-gray-100">
                                        {t("fastDelivery")}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell align="right">
                                <span className="text-sm font-medium text-red_main">
                                    30.000đ
                                </span>
                            </TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell align="left">
                                <div className="-ml-3">
                                    {" "}
                                    <Radio
                                        checked={selectedValue === "normal"}
                                        onChange={handleChange}
                                        value="normal"
                                        name="radio-buttons"
                                        inputProps={{ "aria-label": "normal" }}
                                    />
                                    <span className="text-sm text-gray-100">
                                        {t("normalDelivery")}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell align="right">
                                {" "}
                                <span className="text-sm font-medium text-red_main">
                                    21.000đ
                                </span>
                            </TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell align="left">
                                <div className="-ml-3">
                                    <Radio
                                        checked={selectedValue === "instant"}
                                        onChange={handleChange}
                                        value="instant"
                                        name="radio-buttons"
                                        inputProps={{ "aria-label": "instant" }}
                                    />
                                    <span className="text-sm text-gray-100">
                                        {t("instantDelivery")}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell align="right">
                                {" "}
                                <span className="text-sm font-medium text-red_main">
                                    21.000đ
                                </span>
                            </TableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

function ProductCartItemCard({ product }: { product: productCart }) {
    return (
        <StyledTableRow>
            <TableCell align="left">
                <div className="flex flex-row items-center space-x-4">
                    <img
                        src={product.image_url}
                        className="w-24 h-24"
                        alt={product.name}
                        loading="lazy"
                    />
                    <p className="text-base self-start">{product.name}</p>
                </div>
            </TableCell>
            <TableCell align="right">
                <p className="my-0 font-medium text-base">
                    {changePriceFormat(product.priceDiscount)}đ
                </p>
            </TableCell>
            <TableCell align="right">
                <p className="my-0 font-medium text-base">
                    {product.quantityForProduct}
                </p>
            </TableCell>
            <TableCell align="right">
                <p className="my-0 font-medium text-base text-red_main">
                    {changePriceFormat(
                        getSubTotal(
                            product.priceDiscount,
                            product.quantityForProduct
                        )
                    )}
                    đ
                </p>
            </TableCell>
        </StyledTableRow>
    );
}

function PopOverOrderPayment() {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    //Checkout prices
    const priceCheckout = usePriceCheckout();
    return (
        <>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: "none",
                }}
                disableRestoreFocus
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
            >
                <div className="p-4">
                    <p id="tableTitle" className="text-sm font-medium">
                        {t("discountDetail")}
                    </p>
                    <Table aria-labelledby="tableTitle">
                        <TableBody>
                            <StyledTableRow>
                                <TableCell align="left">
                                    <span className="text-gray-100 text-sm my-0">
                                        {t("productSum")}
                                    </span>
                                </TableCell>
                                <TableCell align="right">
                                    <span className="text-black text-sm font-medium my-0">
                                        {priceCheckout &&
                                            changePriceFormat(
                                                String(priceCheckout.totalSub)
                                            )}
                                        đ
                                    </span>
                                </TableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <TableCell align="left">
                                    <span className="text-gray-100 text-sm my-0">
                                        {t("productDiscount")}
                                    </span>
                                </TableCell>
                                <TableCell align="right">
                                    <span className="text-black text-sm font-medium my-0">
                                        {priceCheckout &&
                                            changePriceFormat(
                                                String(
                                                    priceCheckout.totalProductDiscount
                                                )
                                            )}
                                        đ
                                    </span>
                                </TableCell>
                            </StyledTableRow>
                            <TableRow>
                                <TableCell align="left">
                                    <span className="text-gray-100 text-sm my-0">
                                        {t("voucherDiscounts")}
                                    </span>
                                </TableCell>
                                <TableCell align="right">
                                    <span className="text-black text-sm font-medium my-0">
                                        {priceCheckout &&
                                            changePriceFormat(
                                                String(
                                                    priceCheckout.totalVoucher
                                                )
                                            )}
                                        đ
                                    </span>
                                </TableCell>
                            </TableRow>
                            <StyledTableRow>
                                <TableCell align="left">
                                    <span className="text-gray-100 text-sm my-0">
                                        {t("saving")}
                                    </span>
                                </TableCell>
                                <TableCell align="right">
                                    <span className="text-black text-sm font-medium my-0">
                                        {priceCheckout &&
                                            changePriceFormat(
                                                String(
                                                    priceCheckout.totalDiscount
                                                )
                                            )}
                                        đ
                                    </span>
                                </TableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <TableCell align="left">
                                    <span className="text-gray-100 text-sm my-0">
                                        {t("totalPayment")}
                                    </span>
                                </TableCell>
                                <TableCell align="right">
                                    <span className="my-0 text-red_main text-2xl font-bold">
                                        {priceCheckout &&
                                            changePriceFormat(
                                                String(priceCheckout.totalPrice)
                                            )}
                                        đ
                                    </span>
                                </TableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </div>
            </Popover>
            <div
                aria-owns={open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                <Table size="small">
                    <TableBody>
                        <StyledTableRow>
                            <TableCell align="left">
                                <p className="my-0 text-sm font-medium">
                                    {t("totalOrder")}
                                </p>
                            </TableCell>
                            <TableCell align="right">
                                <p className="my-0 text-red_main text-2xl font-bold">
                                    {priceCheckout &&
                                        changePriceFormat(
                                            String(priceCheckout.totalPrice)
                                        )}
                                    đ
                                </p>
                            </TableCell>
                        </StyledTableRow>
                        {priceCheckout && priceCheckout.totalDiscount !== 0 && (
                            <StyledTableRow>
                                <TableCell align="left">
                                    <p className="my-0 text-sm font-medium">
                                        {t("saving")}
                                    </p>
                                </TableCell>

                                <TableCell align="right">
                                    <p className="my-0 text-gray-100 text-base ">
                                        {priceCheckout &&
                                            priceCheckout.totalDiscount !== 0 &&
                                            changePriceFormat(
                                                String(
                                                    priceCheckout.totalDiscount
                                                )
                                            )}
                                        đ
                                    </p>
                                </TableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

const CheckoutItem = forwardRef((props, ref) => {
    const { t } = useTranslation();
    const { productCart } = useAppSelector((state) => state.product);
    const [productCheckout, setProductCheckout] = useState<any>(null);
    useEffect(() => {
        const getProductCheckout = () => {
            if (productCart) {
                // const result = productCart.filter(
                //     (product: any) => product.check
                // );
                // console.log(result);
                // setProductCheckout(result);
                const newProductCheckout = {};
                Object.entries(productCart).forEach(([key, product]: any) => {
                    if (product.check) {
                        newProductCheckout[key] = product;
                    }
                });

                setProductCheckout(newProductCheckout);
            }
        };

        getProductCheckout();
    }, [productCart]);
    return (
        <div className="flex flex-col flex-1 bg-white p-4" ref={ref}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <span className=" text-base uppercase my-0 font-semibold">
                                {t("product")}
                            </span>
                        </TableCell>
                        <TableCell align="right">
                            <span className=" font-medium text-gray-100 my-0">
                                {t("productPrice")}
                            </span>
                        </TableCell>
                        <TableCell align="right">
                            <span className=" font-medium text-gray-100 my-0">
                                {t("productQuantity")}
                            </span>
                        </TableCell>
                        <TableCell align="right">
                            <span className=" font-medium text-gray-100 my-0">
                                {t("total")}
                            </span>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {productCheckout &&
                        Object.keys(productCheckout).map((key) => (
                            <ProductCartItemCard
                                product={productCheckout[key]}
                                key={key}
                            />
                        ))}
                </TableBody>
            </Table>
            <Divider className="my-4" />
            <div className="flex flex-1 flex-row items-center px-3 justify-end">
                <PopOverOrderPayment />
            </div>
        </div>
    );
});

function CheckoutVoucher() {
    const { t } = useTranslation();
    //Addaddress modal state
    const [open, setOpen] = React.useState(false);
    const handleModalOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        //Set all add Address state to null on Close

        setOpen(false);
    };
    return (
        <div className="flex flex-row flex-1 bg-white justify-between p-4">
            <div className="flex flex-row items-center space-x-4 px-3">
                <BiSolidDiscount color={colors.primary_main} size="24px" />
                <p className="text-primary_main my-0">{t("mtfoodVoucher")}</p>
            </div>
            <TextButton onClick={handleModalOpen}>
                <span className="my-0 text-sm font-medium text-blue">
                    {t("enterVoucher")}
                </span>
            </TextButton>
            <VoucherDialog
                open={open}
                handleModalOpen={handleModalOpen}
                handleClose={handleClose}
            />
        </div>
    );
}

function CheckoutPayment() {
    const { t } = useTranslation();
    const [selectedValue, setSelectedValue] = React.useState("COD");

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div className="flex flex-col flex-1 bg-white p-4">
            <h5 className=" text-base uppercase my-0 px-3 font-semibold">
                {t("choosePaymentOption")}
            </h5>
            <div className="mt-4 w-fit">
                <div className="flex flex-row items-center space-x-4">
                    <Radio
                        checked={selectedValue === "COD"}
                        onChange={handleChange}
                        value="COD"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "COD" }}
                    />
                    <div className="flex flex-row items-center space-x-2 ">
                        <FaMoneyBills
                            style={{ color: colors.primary_main }}
                            className="h-auto w-6"
                        />
                        <span className="text-sm text-gray-100">
                            {t("COD")}
                        </span>
                    </div>
                </div>
                <div className="flex flex-row items-center space-x-4">
                    <Radio
                        checked={selectedValue === "momo"}
                        onChange={handleChange}
                        value="momo"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "momo" }}
                    />
                    <div className="flex flex-row items-center space-x-2 ">
                        <img src="/assets/momo.png" className="h-auto w-6" />
                        <span className="text-sm text-gray-100">
                            {t("momo")}
                        </span>
                    </div>
                </div>
                <div className="flex flex-row items-center space-x-4">
                    <Radio
                        checked={selectedValue === "zalopay"}
                        onChange={handleChange}
                        value="zalopay"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "zalopay" }}
                    />
                    <div className="flex flex-row items-center space-x-2 ">
                        <img src="/assets/zaloPay.png" className="h-auto w-6" />
                        <span className="text-sm text-gray-100">
                            {t("ZaloPay")}
                        </span>
                    </div>
                </div>
                {/* <div className="flex flex-row items-center space-x-4">
                    <Radio
                        checked={selectedValue === "instant"}
                        onChange={handleChange}
                        value="instant"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "instant" }}
                    />
                    <div className="flex flex-row items-center space-x-2 ">
                        <span className="text-sm text-gray-100">
                            {t("VNPay")}
                        </span>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

function CheckoutSumup({ refProps }: { refProps: any }) {
    const { t } = useTranslation();
    const handleSeeInformation = () => {
        console.log(refProps);
        if (refProps) {
            refProps.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    };
    return (
        <div className="flex flex-col flex-1 bg-white p-4">
            <div className="flex flex-row flex-1 justify-between px-3 items-center">
                <h5 className=" text-base uppercase my-0 font-semibold">
                    {t("order")}
                </h5>
                <TextButton>
                    <span className="normal-case my-0 text-blue">
                        {t("change")}
                    </span>
                </TextButton>
            </div>
            <div className="flex flex-row flex-1 px-3 items-center">
                <span className="text-sm text-gray-100 my-0">
                    5 {t("product")}
                </span>
                <TextButton
                    endIcon={
                        <KeyboardArrowUpIcon sx={{ color: colors.blue }} />
                    }
                    onClick={() => handleSeeInformation()}
                >
                    <span className="normal-case my-0 text-blue">
                        {t("seeInformation")}
                    </span>
                </TextButton>
            </div>
            <Divider className="my-4" />
            <div className="flex flex-row flex-1 justify-end">
                <div className="flex w-fit">
                    <Table aria-labelledby="tableTitle">
                        <TableBody>
                            <StyledTableRow>
                                <TableCell
                                    align="left"
                                    className="min-w-fit w-96"
                                >
                                    <span className="text-gray-100 text-sm my-0">
                                        {t("productSum")}
                                    </span>
                                </TableCell>
                                <TableCell align="right">
                                    <span className="text-black text-sm font-medium my-0">
                                        500.000đ
                                    </span>
                                </TableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <TableCell align="left">
                                    <span className="text-gray-100 text-sm my-0">
                                        {t("productDiscount")}
                                    </span>
                                </TableCell>
                                <TableCell align="right">
                                    <span className="text-black text-sm font-medium my-0">
                                        500.000đ
                                    </span>
                                </TableCell>
                            </StyledTableRow>
                            <TableRow>
                                <TableCell align="left">
                                    <span className="text-gray-100 text-sm my-0">
                                        {t("voucherDiscounts")}
                                    </span>
                                </TableCell>
                                <TableCell align="right">
                                    <span className="text-black text-sm font-medium my-0">
                                        500.000đ
                                    </span>
                                </TableCell>
                            </TableRow>
                            <StyledTableRow>
                                <TableCell align="left">
                                    <span className="text-gray-100 text-sm my-0">
                                        {t("saving")}
                                    </span>
                                </TableCell>
                                <TableCell align="right">
                                    <span className="text-black text-sm font-medium my-0">
                                        500.000đ
                                    </span>
                                </TableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <TableCell align="left">
                                    <span className="text-gray-100 text-sm my-0">
                                        {t("totalPayment")}
                                    </span>
                                </TableCell>
                                <TableCell align="right">
                                    <span className="my-0 text-red_main text-2xl font-bold">
                                        500.000đ
                                    </span>
                                </TableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <TableCell align="left"></TableCell>
                                <TableCell align="right">
                                    <ContainedButton className="bg-primary_main">
                                        <span>{t("orderNow")}</span>
                                    </ContainedButton>
                                </TableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
export default function Checkout() {
    const { t } = useTranslation();
    const itemCard = useRef();
    return (
        <div className="flex flex-1 flex-col">
            <HeaderCheckout />
            <div className="flex flex-1 flex-col bg-background_main p-4 space-y-4">
                <CheckoutAddress />
                <CheckoutDelivery />
                <CheckoutItem ref={itemCard} />
                <CheckoutVoucher />
                <CheckoutPayment />
                <CheckoutSumup refProps={itemCard} />
            </div>
            <Footer />
        </div>
    );
}
