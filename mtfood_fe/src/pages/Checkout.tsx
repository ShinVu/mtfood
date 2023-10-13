import React, { useState } from "react";
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
    const [open, setOpen] = useState(false);
    const handleModalOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className="flex flex-col flex-1 bg-white py-4 px-10">
            <h5 className="text-primary_main text-base uppercase my-0">
                {t("orderAddress")}
            </h5>
            <div className="flex flex-1 justify-between items-center mt-4">
                <div className="flex flex-col">
                    <p className="font-medium text-sm my-0">Le Minh Tuan</p>
                    <p className="font-medium text-sm my-0">123456789</p>
                </div>
                <p className="font-normal text-sm my-0">address</p>
                <p className="text-primary_main normal-case my-0 text-sm">
                    {t("default")}
                </p>
                <TextButton onClick={handleModalOpen}>
                    <span className="normal-case text-blue">{t("change")}</span>
                </TextButton>
            </div>
            <AddAddressDialog
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

function ProductCartItemCard(props) {
    const { product } = props;
    return (
        <StyledTableRow>
            <TableCell align="left">
                <div className="flex flex-row items-center space-x-4">
                    <img src="/assets/image_14.png" className="w-24 h-24" />
                    <p className="text-base self-start">{product.name}</p>
                </div>
            </TableCell>
            <TableCell align="right">
                <p className="my-0">{product.basePrice}</p>
            </TableCell>
            <TableCell align="right">
                <p className="my-0">{product.quantity}</p>
            </TableCell>
            <TableCell align="right">
                <p className="my-0">{product.price}</p>
            </TableCell>
        </StyledTableRow>
    );
}

function CheckoutItem() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col flex-1 bg-white p-4">
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
                    {products.map((product) => (
                        <ProductCartItemCard product={product} />
                    ))}
                </TableBody>
            </Table>
            <Divider className="my-4" />
            <div className="flex flex-1 flex-row items-center px-3 justify-between">
                <div className="flex flex-row items-center space-x-4">
                    <p className="my-0 text-gray-100">{t("message")}</p>
                    <TextField size="small" placeholder={t("note")} />
                </div>
                <div className="flex flex-row items-center space-x-12">
                    <p className="my-0 text-gray-100">{t("totalProduct")}</p>
                    <p className="my-0 text-red_main font-semibold">500.000đ</p>
                </div>
            </div>
        </div>
    );
}

function CheckoutVoucher() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-row flex-1 bg-white justify-between p-4">
            <div className="flex flex-row items-center space-x-4 px-3">
                <BiSolidDiscount color={colors.primary_main} size="24px" />
                <p className="text-primary_main my-0">{t("mtfoodVoucher")}</p>
            </div>
            <TextButton>
                <span className="my-0 text-sm font-medium text-blue">
                    {t("enterVoucher")}
                </span>
            </TextButton>
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

function CheckoutSumup() {
    const { t } = useTranslation();
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
                                    <ContainedButton>
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
    return (
        <div className="flex flex-1 flex-col">
            <HeaderCheckout />
            <div className="flex flex-1 flex-col bg-background_main p-4 space-y-4">
                <CheckoutAddress />
                <CheckoutDelivery />
                <CheckoutItem />
                <CheckoutVoucher />
                <CheckoutPayment />
                <CheckoutSumup />
            </div>
            <Footer />
        </div>
    );
}
