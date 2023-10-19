import React, { useState } from "react";
//Import MUI
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Divider,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { RiDeleteBin6Line } from "react-icons/ri";
import { styled as mui_styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import { BiSolidDiscount } from "react-icons/bi";
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
import Popover from "@mui/material/Popover";
//Import i18-n
import { useTranslation } from "react-i18next";

//lodash
import { debounce } from "@mui/material/utils";
import { useNavigate } from "react-router-dom";

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

function ProductCartItemCard(props) {
    const navigate = useNavigate();
    const { product } = props;
    return (
        <StyledTableRow>
            <TableCell align="left">
                <div className="flex flex-row items-center space-x-4">
                    <Checkbox checked={true} onChange={() => {}} />
                    <div
                        className="cursor-pointer flex flex-row items-center space-x-4"
                        onClick={() =>
                            navigate(`/product/details/${product.id}`)
                        }
                    >
                        <img src="/assets/image_14.png" className="w-24 h-24" />
                        <p className="text-base self-start">{product.name}</p>
                    </div>
                </div>
            </TableCell>
            <TableCell align="center">
                <p className="my-0">{product.basePrice}</p>
            </TableCell>
            <TableCell align="center">
                <div className="flex flex-1 items-center justify-center">
                    <div className="flex flex-row items-center border w-fit">
                        <IconButton
                            aria-label="delete"
                            className="rounded-none"
                        >
                            <RemoveIcon className="rounded-none" />
                        </IconButton>
                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{
                                borderRightWidth: 1,
                                bgcolor: colors.gray[100],
                            }}
                        />
                        <TextField
                            variant="outlined"
                            size="small"
                            inputProps={{
                                min: 0,
                                style: { textAlign: "center" },
                            }}
                            sx={{
                                width: "8ch",
                                "& fieldset": { border: "none" },
                            }}
                        />
                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{
                                borderRightWidth: 1,
                                bgcolor: colors.gray[100],
                            }}
                        />
                        <IconButton aria-label="delete">
                            <AddIcon />
                        </IconButton>
                    </div>
                </div>
            </TableCell>
            <TableCell align="center">
                <p className="my-0">{product.price}</p>
            </TableCell>
            <TableCell align="center">
                <FavoriteBorderIcon sx={{ fontSize: 24 }} />
            </TableCell>
            <TableCell align="center">
                <div className="flex justify-center">
                    <RiDeleteBin6Line className="w-6 h-6" />
                </div>
            </TableCell>
        </StyledTableRow>
    );
}

function ProductCartItems(props) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { product } = props;
    return (
        <div className="flex flex-1 bg-white">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">
                            <div className="space-x-3">
                                <Checkbox
                                    checked={true}
                                    indeterminate={true}
                                    onChange={() => {}}
                                />
                                <span className="font-medium text-gray-100 my-0">
                                    {" "}
                                    {t("allProduct")}
                                </span>
                            </div>
                        </TableCell>
                        <TableCell align="center">
                            {" "}
                            <span className="font-medium text-gray-100 my-0">
                                {" "}
                                {t("productPrice")}
                            </span>
                        </TableCell>
                        <TableCell align="center">
                            {" "}
                            <span className="font-medium text-gray-100 my-0">
                                {" "}
                                {t("productQuantity")}
                            </span>
                        </TableCell>
                        <TableCell align="center">
                            {" "}
                            <span className="font-medium text-gray-100 my-0">
                                {" "}
                                {t("subTotal")}
                            </span>
                        </TableCell>
                        <TableCell align="center">
                            {" "}
                            <span className="font-medium text-gray-100 my-0">
                                {" "}
                                {t("favorite")}
                            </span>
                        </TableCell>
                        <TableCell align="center">
                            {" "}
                            <span className="font-medium text-gray-100">
                                {" "}
                                {t("delete")}
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
        </div>
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
    const id = open ? "simple-popover" : undefined;
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
                                    500.000đ
                                </p>
                            </TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell align="left">
                                <p className="my-0 text-sm font-medium">
                                    {t("saving")}
                                </p>
                            </TableCell>
                            <TableCell align="right">
                                <p className="my-0 text-gray-100 line-through text-base ">
                                    50.000đ
                                </p>
                            </TableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

function OrderProceedCard() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="flex flex-1 flex-col bg-white p-4">
            <div className="flex flex-1 justify-end items-center space-x-24 px-4">
                <div className="flex flex-row items-center space-x-4">
                    <BiSolidDiscount color={colors.primary_main} size="24px" />
                    <p className="text-primary_main my-0">
                        {t("mtfoodVoucher")}
                    </p>
                </div>
                <p className="my-0 text-sm font-medium">{t("enterVoucher")}</p>
            </div>
            <Divider className="my-4" />
            <div className="flex flex-1 items-center  justify-between">
                <div className="flex flex-row items-center space-x-12">
                    <div className="flex flex-row items-center -ml-3">
                        <Checkbox
                            checked={true}
                            indeterminate={true}
                            onChange={() => {}}
                        />
                        <TextButton>
                            <p className="my-0 text-sm font-medium text-blue normal-case ml-4">
                                {t("chooseAll")}
                            </p>
                        </TextButton>
                    </div>
                    <TextButton>
                        {" "}
                        <span className="my-0 text-sm font-medium text-blue normal-case">
                            {t("delete")}
                        </span>
                    </TextButton>
                    <TextButton>
                        <span className="my-0 text-sm font-medium text-blue normal-case ">
                            {t("addFavorite")}
                        </span>
                    </TextButton>
                </div>

                <div className="flex w-fit px-4 items-center space-x-48">
                    <PopOverOrderPayment />
                    <div>
                        <ContainedButton
                            className="h-fit bg-primary_main"
                            onClick={() => navigate("/checkout")}
                        >
                            <span>{t("buy")}</span>
                        </ContainedButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default function Cart() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-1 flex-col">
            <HeaderCheckout />
            <div className="flex flex-1 flex-col bg-background_main p-4 space-y-4">
                <ProductCartItems products={products} />
                <OrderProceedCard />
            </div>
            <Footer />
        </div>
    );
}
