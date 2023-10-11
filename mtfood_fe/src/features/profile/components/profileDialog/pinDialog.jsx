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

//Import utils
import { matchIsNumeric } from "../../../../utils";

function ChangePINDialog({
    handleChange,
    validateChar,
    handleClose,
    otp,
    handleSubmitSuccess,
}) {
    const { t } = useTranslation();
    return (
        <>
            <DialogTitle>
                <span>{t("changePin")}</span>
            </DialogTitle>
            <DialogContent>
                <OtpInputStyled
                    otp={otp}
                    handleChange={handleChange}
                    validateChar={validateChar}
                />
            </DialogContent>
            <DialogActions>
                <TextButton
                    onClick={handleClose}
                    sx={{ color: colors.gray[200] }}
                >
                    {t("cancel")}
                </TextButton>
                <Button onClick={handleSubmitSuccess}>{t("continue")}</Button>
            </DialogActions>
        </>
    );
}

function ChangeReEnterPINDialog({
    handleChange,
    validateChar,
    handleClose,
    handleSubmitSuccess,
    otp,
}) {
    const { t } = useTranslation();
    return (
        <>
            <DialogTitle>
                <span>{t("changeReEnterPin")}</span>
            </DialogTitle>
            <DialogContent>
                <OtpInputStyled
                    otp={otp}
                    handleChange={handleChange}
                    validateChar={validateChar}
                />
            </DialogContent>
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
export default function PinDialog({ handleModalOpen, handleClose }) {
    const { t } = useTranslation();
    const [type, setType] = React.useState("enterPIN");
    const [otp, setOtp] = React.useState("");
    const [otp2, setOtp2] = React.useState("");
    const validateChar = (value, index) => {
        const valueNumber = parseInt(value, 10);
        return matchIsNumeric(valueNumber);
    };

    const handleChange = (newValue) => {
        setOtp(newValue);
    };
    const handleChange2 = (newValue) => {
        setOtp2(newValue);
    };

    const handleSubmitSuccess = () => {
        setType("reEnterPIN");
    };

    switch (type) {
        case "enterPIN":
            return (
                <ChangePINDialog
                    otp={otp}
                    handleSubmitSuccess={handleSubmitSuccess}
                    handleClose={handleClose}
                    handleChange={handleChange}
                    validateChar={validateChar}
                />
            );
        case "reEnterPIN":
            return (
                <ChangeReEnterPINDialog
                    otp={otp2}
                    handleClose={handleClose}
                    handleChange={handleChange2}
                    validateChar={validateChar}
                />
            );
    }
}
