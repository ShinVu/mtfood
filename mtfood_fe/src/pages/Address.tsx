import React, { useState } from "react";
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

const user = {
    address: "Bạch Đằng, Quận Tân Bình, TP.HCM",
    avatar: "./assets/image_15.png",
    name: "Lorem",
    phoneNumber: "12312412412",
};

export default function UserAddress() {
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const handleModalOpen = () => {
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
                            className="h-fit w-fit bg-primary_main"
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
