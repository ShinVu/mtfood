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

function ChangeNumberDialog({ handleClose, handleSubmitSuccess }) {
    const { t } = useTranslation();
    return (
        <>
            <DialogTitle>
                <span>{t("phoneNumber")}</span>
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    type="email"
                    fullWidth
                    size="small"
                    placeholder={t("phoneNumber")}
                />

                <DialogContentText className="mt-4">
                    <span>{t("phoneNumberChangeMessage")}</span>
                </DialogContentText>
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

function ChangeNumberVerifyDialog({ handleClose }) {
    const { t } = useTranslation();
    const [otp, setOtp] = React.useState("");
    const [count, setCount] = useState(2);
    useEffect(() => {
        const id = setInterval(() => {
            setCount((oldCount) => oldCount - 1);
        }, 1000);
        const stopInterval = () => {
            clearInterval(id);
        };
        setTimeout(stopInterval, 2000);
        return () => {
            stopInterval();
        };
    }, []);
    const validateChar = (value, index) => {
        const valueNumber = parseInt(value, 10);
        return matchIsNumeric(valueNumber);
    };

    const handleChange = (newValue) => {
        setOtp(newValue);
    };
    return (
        <>
            <DialogTitle>
                <span>{t("phoneNumberVerify")}</span>
            </DialogTitle>
            <DialogContent>
                <DialogContentText className="">
                    <span>{t("phoneNumberVerifyMessage")}:</span>
                </DialogContentText>
                <DialogContentText className="mb-4">
                    <span className="text-black font-semibold">123456</span>
                </DialogContentText>
                <OtpInputStyled
                    otp={otp}
                    handleChange={handleChange}
                    validateChar={validateChar}
                />
                <div className="mt-4">
                    {count !== 0 ? (
                        <>
                            <p className="text-base">
                                {t("sendCode")}: <span>{count}</span>{" "}
                            </p>
                            <p className="text-base">
                                {t("verificationTimeLimited")}
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-row items-center">
                                <p className="text-base my-0">
                                    {t("notReceived")}?
                                </p>
                                <Button
                                    variant="text"
                                    sx={{ textTransform: "none" }}
                                >
                                    {t("resendCode")}
                                </Button>
                            </div>
                            <p className="text-base">
                                {t("verificationTimeLimited")}
                            </p>
                        </>
                    )}
                </div>
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
export default function PhoneNumberDialog({ handleClose }) {
    const [type, setType] = useState("phoneNumber");
    const handleSubmitSuccess = () => {
        setType("phoneNumberVerify");
    };

    switch (type) {
        case "phoneNumber":
            return (
                <ChangeNumberDialog
                    handleClose={handleClose}
                    handleSubmitSuccess={handleSubmitSuccess}
                />
            );
        case "phoneNumberVerify":
            return <ChangeNumberVerifyDialog handleClose={handleClose} />;
    }
}
