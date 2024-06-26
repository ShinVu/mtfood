import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
//Import MUI

import AddIcon from "@mui/icons-material/Add";
//Import components
import Header from "../components/header";
import Footer from "../components/footer";
import {
    ContainedButton,
    OutlinedButton,
    TextButton,
} from "../components/button.jsx";

import {
    ProfileNavigation,
    AddAddressDialog,
    UserAddressItem,
} from "../features/profile/index.js";
import { Alert, Paper, Snackbar } from "@mui/material";
import axiosClient from "../../axios-client.js";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook.js";
import {
    setAddress,
    setAddressInitialDialogStateToInitial,
} from "../features/authentication/authenticationSlice.js";

export default function UserAddress() {
    const { t } = useTranslation();

    //Redux
    const { user, addresses } = useAppSelector((state) => state.authentication);
    const dispatch = useAppDispatch();

    //Addaddress modal state
    const [open, setOpen] = React.useState(false);
    const handleModalOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        //Set all add Address state to null on Close

        dispatch(setAddressInitialDialogStateToInitial());
        setOpen(false);
    };

    //Snackbar state
    const [openSnackbar, setOpenSnackbar] = useState({
        state: false,
        message: "",
        severity: "",
    });
    const handleSnackbarOpen = (message: string, severity: string) => {
        if (!severity || severity === "") {
            severity = "info";
        }
        setOpenSnackbar({ state: true, message: message, severity: severity });
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnackbar({ state: false, message: "", severity: "" });
    };

    //Get user all addresses
    useEffect(() => {
        const fetchAddress = () => {
            const payload = {
                customerId: user.id,
            };
            axiosClient
                .post("/getAddress", payload)
                .then(({ data }) => {
                    const addresses = data.result.address;
                    dispatch(setAddress(addresses));
                })
                .catch();
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
                <div className="flex flex-col flex-1 mx-12 space-y-4">
                    <div className="flex flex-row w-full justify-between items-center">
                        <p className="text-base font-bold  text-primary_main uppercase my-0">
                            {t("address")}
                        </p>
                        <ContainedButton
                            className="h-fit w-fit bg-rich-black"
                            startIcon={<AddIcon />}
                            onClick={handleModalOpen}
                        >
                            {t("addAddress")}
                        </ContainedButton>
                    </div>

                    {addresses && addresses.length > 0 && (
                        <Paper
                            className="flex flex-col p-4 space-y-8"
                            elevation={3}
                        >
                            {addresses.map((address) => (
                                <UserAddressItem
                                    key={address.id}
                                    address={address}
                                    handleModalOpen={handleModalOpen}
                                    handleSnackbarOpen={handleSnackbarOpen}
                                    handleSnackbarClose={handleSnackbarClose}
                                />
                            ))}
                        </Paper>
                    )}
                </div>
            </div>
            {open && (
                <AddAddressDialog
                    open={open}
                    handleModalOpen={handleModalOpen}
                    handleClose={handleClose}
                    handleSnackbarOpen={handleSnackbarOpen}
                    handleSnackbarClose={handleSnackbarClose}
                    keepMounted={false}
                />
            )}
            <Snackbar
                open={openSnackbar.state}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={
                        openSnackbar.severity === ""
                            ? "info"
                            : openSnackbar.severity
                    }
                    sx={{ width: "100%" }}
                >
                    {t(openSnackbar.message)}
                </Alert>
            </Snackbar>
            <Footer />
        </div>
    );
}
