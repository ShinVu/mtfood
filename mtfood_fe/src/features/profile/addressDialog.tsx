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

import AddIcon from "@mui/icons-material/Add";
//Import i18-next
import { useTranslation } from "react-i18next";

//Import color
import { colors } from "../../../public/theme";

//Import components
import { ContainedButton, TextButton } from "../../components/button";
import useWindowSizeDimensions from "../../hooks/useWindowResponsiveDimensions";
import { getSizeDialog } from "../../utils";
import {
    Divider,
    Radio,
    RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import axiosClient from "../../../axios-client";
import {
    setAddress,
    setAddressInitialDialogStateToInitial,
    setCurrentAddress,
} from "../authentication/authenticationSlice";
import { AddAddressDialog, UserAddressItem } from ".";
import { current } from "@reduxjs/toolkit";

export default function AddressDialog(props) {
    const { t } = useTranslation();
    const size = useWindowSizeDimensions();
    const { open, handleModalOpen, handleClose } = props;
    const { addresses, user, currentAddress } = useAppSelector(
        (state) => state.authentication
    );
    const dispatch = useAppDispatch();

    //AddAddress dialog state
    const [addAddressOpen, setAddAddressOpen] = useState<boolean>(false);
    const handleNewAddModalOpen = () => {
        dispatch(setAddressInitialDialogStateToInitial());
        setAddAddressOpen(true);
    };
    const handleAddAddressModalOpen = () => {
        setAddAddressOpen(true);
    };
    const handleAddAddressClose = () => {
        setAddAddressOpen(false);
    };

    const handleAddressChecked = (address) => {
        if (address) {
            dispatch(setCurrentAddress(address));
        }
    };
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
                <div className="flex w-full justify-between">
                    <span className="uppercase text-black text-medium text-xl">
                        {t("address")}
                    </span>
                    <ContainedButton
                        className="h-fit w-fit bg-primary_main"
                        startIcon={<AddIcon />}
                        onClick={handleNewAddModalOpen}
                    >
                        {t("addAddress")}
                    </ContainedButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <div className="flex flex-1 flex-col space-y-8">
                    {addresses && addresses.length !== 0 ? (
                        addresses.map((address) => (
                            <div
                                key={address.id}
                                className="flex flex-row space-x-4"
                            >
                                <Radio
                                    checked={
                                        currentAddress
                                            ? currentAddress.id === address.id
                                            : false
                                    }
                                    onClick={() =>
                                        handleAddressChecked(address)
                                    }
                                    value={address.id}
                                    name={String(address.id)}
                                    inputProps={{ "aria-label": address.id }}
                                    className="h-fit"
                                />
                                <UserAddressItem
                                    key={address.id}
                                    address={address}
                                    handleModalOpen={handleAddAddressModalOpen}
                                    // handleSnackbarOpen={handleSnackbarOpen}
                                    // handleSnackbarClose={
                                    //     handleSnackbarClose
                                    // }
                                />
                            </div>
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
            {addAddressOpen && (
                <AddAddressDialog
                    open={addAddressOpen}
                    handleClose={handleAddAddressClose}
                />
            )}
        </Dialog>
    );
}
