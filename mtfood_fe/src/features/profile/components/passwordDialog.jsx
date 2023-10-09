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
} from "../../../components/Button";
import OtpInputStyled from "../../../components/OtpInput";
import { colors } from "../../../../public/theme";

//Import utils
import { matchIsNumeric } from "../../../utils";

export default function PasswordDialog({ handleModalOpen, handleClose }) {
    const { t } = useTranslation();
    return (
        <>
            <DialogTitle>
                <span>{t("changePassword")}</span>
            </DialogTitle>
            <DialogContent></DialogContent>
            <DialogActions>
                <TextButton
                    onClick={handleClose}
                    sx={{ color: colors.gray[200] }}
                >
                    {t("cancel")}
                </TextButton>
                <Button onClick={handleClose}>{t("verify")}</Button>
            </DialogActions>
        </>
    );
}
