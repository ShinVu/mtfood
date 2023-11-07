import React, { useState, useEffect, useCallback } from "react";
//Import MUI element
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";
import Popper from "@mui/material/Popper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//Import i18-next
import { useTranslation } from "react-i18next";

//Import color
import { colors } from "../../../public/theme";

//Import components
import { TextButton } from "../../components/button";
import useWindowSizeDimensions from "../../hooks/useWindowResponsiveDimensions";
import { getSizeDialog } from "../../utils";
import {
    Divider,
    Radio,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import axiosClient from "../../../axios-client";
import { setAddress } from "../authentication/authenticationSlice";

export default function AddressDialog(props) {
    const { t } = useTranslation();
    const size = useWindowSizeDimensions();
    const { open, handleModalOpen, handleClose } = props;
    const { addresses, user } = useAppSelector((state) => state.authentication);
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
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth={getSizeDialog(size)}
            disableScrollLock
        >
            <DialogTitle>
                {" "}
                <span className="uppercase text-black text-medium text-xl">
                    {t("address")}
                </span>
            </DialogTitle>
            <DialogContent>
                <div className="flex flex-1 flex-col space-y-8">
                    <Table>
                        <TableBody>
                            {addresses && addresses.length === 0 ? (
                                <span>No item</span>
                            ) : (
                                addresses.map((address) => {
                                    <TableRow>
                                        <TableCell className="w-0 px-0 align-top">
                                            <Radio className="pl-0 pr-4" />
                                        </TableCell>
                                        <TableCell className="w-full align-top px-0">
                                            <div className="flex flex-row space-x-4  mt-2">
                                                <p className="text-black text-base font-medium uppercase">
                                                    {address.name}
                                                </p>
                                                <Divider
                                                    orientation="vertical"
                                                    flexItem
                                                />
                                                <p className="text-gray-100 text-base">
                                                    {address.phoneNumber}
                                                </p>
                                            </div>

                                            <p className="text-base text-gray-100 mt-3">
                                                {address.address}
                                            </p>
                                            <p className="text-base text-gray-100">
                                                {address.ward},{" "}
                                                {address.district},{" "}
                                                {address.province}
                                            </p>
                                            {address.default && (
                                                <div className="text-primary_main border-2 border-primary_main  mt-4 w-fit p-2 rounded font-semibold text-sm">
                                                    {t("default")}
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="px-0 align-top">
                                            <Button
                                                variant="text"
                                                className="w-24 text-blue"
                                            >
                                                {t("update")}
                                            </Button>
                                        </TableCell>
                                    </TableRow>;
                                })
                            )}
                        </TableBody>
                    </Table>
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
