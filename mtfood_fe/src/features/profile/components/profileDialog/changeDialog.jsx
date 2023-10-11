import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";
//Import element
import {
    ContainedButton,
    OutlinedButton,
    TextButton,
} from "../../../../components/button";
import OtpInputStyled from "../../../../components/OtpInput";
import { colors } from "../../../../../public/theme";
import PhoneNumberDialog from "./phoneNumberDialog";
import EmailDialog from "./emailDialog";
import PasswordDialog from "./passwordDialog";
import PinDialog from "./pinDialog";
//Import utils
import { matchIsNumeric } from "../../../../utils";

export default function ChangeDialog(props) {
    const { t } = useTranslation();
    const { open, type, handleModalOpen, handleClose } = props;
    const RenderDialog = () => {
        switch (type) {
            case "phoneNumber":
                return (
                    <PhoneNumberDialog
                        handleModalOpen={handleModalOpen}
                        handleClose={handleClose}
                    />
                );
            case "email":
                return (
                    <EmailDialog
                        handleModalOpen={handleModalOpen}
                        handleClose={handleClose}
                    />
                );
            case "changePassword":
                return (
                    <PasswordDialog
                        handleModalOpen={handleModalOpen}
                        handleClose={handleClose}
                    />
                );
            case "changePin":
                return (
                    <PinDialog
                        handleModalOpen={handleModalOpen}
                        handleClose={handleClose}
                    />
                );
        }
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <RenderDialog />
            </Dialog>
        </div>
    );
}
