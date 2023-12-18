import { useState, useEffect } from "react";
//Import MUI element
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";

import AddIcon from "@mui/icons-material/Add";
//Import i18-next
import { useTranslation } from "react-i18next";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import axiosClient from "../../axios-client";
import { changePriceFormat, checkVoucher, getSizeDialog } from "../utils";
import useWindowSizeDimensions from "../hooks/useWindowResponsiveDimensions";
import { orderVoucher } from "../models/order.model";
import { TextButton } from "./button";
import { colors } from "../../public/theme";
import { Checkbox, Paper, Radio } from "@mui/material";
import { Check } from "@mui/icons-material";
import { setVoucher } from "../features/order/orderSlice";
import usePriceCheckout from "../hooks/usePriceCheckout";
import { handleSnackbarDialogOpen } from "../features/authentication/authenticationSlice";
import usePriceCart from "../hooks/usePrice";

export default function VoucherDialog(props: any) {
    const { t } = useTranslation();
    const size = useWindowSizeDimensions();
    const { open, handleModalOpen, handleClose } = props;
    const { selectedVoucher } = useAppSelector((state) => state.order);
    const dispatch = useAppDispatch();

    const [vouchers, setVouchers] = useState<orderVoucher[] | null>(null);
    const [voucherSet, setVoucherSet] = useState<boolean>(false);
    const price = usePriceCart();
    const handleVoucherChecked = (voucher: orderVoucher) => {
        if (voucher.id === selectedVoucher?.id) {
            dispatch(setVoucher(null));
        } else {
            const isAvailable = checkVoucher(
                voucher.minimum_order_value,
                price?.totalPrice
            );
            if (isAvailable) {
                dispatch(setVoucher(voucher));
            } else {
                dispatch(
                    handleSnackbarDialogOpen({
                        message:
                            "Không thể áp dụng voucher với đơn hàng của bạn",
                        severity: "error",
                    })
                );
            }
        }
    };
    useEffect(() => {
        const fetchVoucher = async () => {
            const response = await axiosClient.get("/getOrderVoucher");
            const newVouchers: orderVoucher[] = response.data.result.voucher;
            const availableVouchers: orderVoucher[] = [];
            const unAvailableVouchers: orderVoucher[] = [];
            for (let i = 0; i < newVouchers.length; i++) {
                if (
                    checkVoucher(
                        newVouchers[i].minimum_order_value,
                        price?.totalPrice
                    )
                ) {
                    availableVouchers.push(newVouchers[i]);
                } else {
                    unAvailableVouchers.push(newVouchers[i]);
                }
            }
            const finalVouchers = availableVouchers.concat(unAvailableVouchers);

            if (!vouchers) {
                setVouchers(finalVouchers);
                setVoucherSet(true);
            }
        };
        fetchVoucher();
    }, []);

    useEffect(() => {
        if (vouchers) {
            const availableVouchers: orderVoucher[] = [];
            const unAvailableVouchers: orderVoucher[] = [];
            for (let i = 0; i < vouchers.length; i++) {
                if (
                    checkVoucher(
                        vouchers[i].minimum_order_value,
                        price?.totalPrice
                    )
                ) {
                    availableVouchers.push(vouchers[i]);
                } else {
                    unAvailableVouchers.push(vouchers[i]);
                }
            }
            const finalVouchers = availableVouchers.concat(unAvailableVouchers);

            setVouchers(finalVouchers);
        }
    }, [voucherSet, price?.totalPrice]);
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth={getSizeDialog(size)}
            disableScrollLock
        >
            <DialogTitle>
                <div className="flex w-full justify-between">
                    <span className="uppercase text-black text-medium text-xl">
                        {t("voucher")}
                    </span>
                </div>
            </DialogTitle>
            <DialogContent>
                <div className="flex flex-1 flex-col space-y-8">
                    {vouchers && vouchers.length !== 0 ? (
                        vouchers.map((voucher) => (
                            <Paper
                                key={voucher.id}
                                className={`flex flex-row space-x-4 justify-between items-center pr-12 ${
                                    checkVoucher(
                                        voucher.minimum_order_value,
                                        price?.totalPrice
                                    )
                                        ? ""
                                        : "opacity-50"
                                }`}
                            >
                                <div className="flex flex-row space-x-2 w-3/4">
                                    <img
                                        src="/assets/logo.png"
                                        alt="logo"
                                        loading="lazy"
                                        className="w-16 h-16"
                                    />
                                    <div className="flex flex-col">
                                        <p className="font-bold text-base">
                                            Giảm{" "}
                                            {changePriceFormat(
                                                voucher.total_discount
                                            )}{" "}
                                            cho đơn hàng từ{" "}
                                            {changePriceFormat(
                                                voucher.minimum_order_value
                                            )}
                                        </p>
                                        <p className="text-sm">
                                            {voucher.notes}
                                        </p>
                                    </div>
                                </div>
                                <Checkbox
                                    checked={voucher.id === selectedVoucher?.id}
                                    onClick={() =>
                                        handleVoucherChecked(voucher)
                                    }
                                    className="h-fit"
                                />
                            </Paper>
                        ))
                    ) : (
                        <span>No item</span>
                    )}
                </div>
            </DialogContent>
            <DialogActions>
                <TextButton
                    sx={{ color: colors.gray[200] }}
                    onClick={handleClose}
                >
                    {t("cancel")}
                </TextButton>
                <Button onClick={handleClose}>{t("confirm")}</Button>
            </DialogActions>
        </Dialog>
    );
}
