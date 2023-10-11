import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
//Import MUI
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled as mui_styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
//Import components
import Header from "../components/header";
import Footer from "../components/Footer";
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

const StyledTableRow = mui_styled(TableRow)(({ theme }) => ({
    "& td, & th": {
        border: 0,
    },
}));

const users = [
    {
        address: "Bạch Đằng, Quận Tân Bình, TP.HCM",
        avatar: "./assets/image_15.png",
        name: "Lorem",
    },
    {
        address: "Bạch Đằng, Quận Tân Bình, TP.HCM",
        avatar: "./assets/image_15.png",
        name: "Lorem",
    },
];

const user = {
    address: "Bạch Đằng, Quận Tân Bình, TP.HCM",
    avatar: "./assets/image_15.png",
    name: "Lorem",
    phoneNumber: "12312412412",
};
const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: 10,
        bottom: 10,
        width: 28,
        height: 28,
        borderRadius: 28,
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    },
}));
export default function UserAddress() {
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const handleModalOpen = (type) => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className="flex flex-1 flex-col">
            <Header />
            <div className="flex flex-row flex-1 w-full px-4 py-12 bg-background_main">
                <ProfileNavigation user={user} />
                <div className="flex flex-col flex-1 mx-12 space-y-4">
                    <div className="flex flex-row flex-1 justify-between items-center">
                        <p className="text-base font-bold  text-primary_main uppercase my-0">
                            {t("address")}
                        </p>
                        <ContainedButton
                            className="h-fit w-fit"
                            startIcon={<AddIcon />}
                            onClick={handleModalOpen}
                        >
                            {t("addAddress")}
                        </ContainedButton>
                    </div>
                    <div className="flex p-4 flex-1 flex-col xl:flex-col bg-white space-y-12">
                        <UserAddressItem user={user} />
                        <UserAddressItem user={user} />
                    </div>
                </div>
            </div>
            <AddAddressDialog
                open={open}
                handleModalOpen={handleModalOpen}
                handleClose={handleClose}
            />
            <Footer />
        </div>
    );
}
