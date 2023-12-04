import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { TextButton } from "./button";
import { useState } from "react";
import useWindowSizeDimensions from "../hooks/useWindowResponsiveDimensions";
import { getSizeDialog } from "../utils";
import { colors } from "../../public/theme";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { handleLogInDialogClose } from "../features/authentication/authenticationSlice";
import { useNavigate } from "react-router-dom";

export default function LogInDialog() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { logInDialogState } = useAppSelector(
        (state) => state.authentication
    );
    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        dispatch(handleLogInDialogClose());
        navigate("/login");
    };
    const handleClose = () => {
        dispatch(handleLogInDialogClose());
    };

    const size = useWindowSizeDimensions();
    return (
        <Dialog open={logInDialogState} onClose={handleClose} disableScrollLock>
            <DialogTitle>
                {" "}
                <span className="font-bold text-3xl">{t("pleaseSignin")}</span>
            </DialogTitle>
            <DialogContent>
                <p>{t("pleaseSigninDialog")}</p>
            </DialogContent>
            <DialogActions>
                <TextButton
                    sx={{ color: colors.gray[100] }}
                    onClick={handleClose}
                >
                    {t("cancel")}
                </TextButton>
                <Button onClick={handleSubmit}>{t("confirm")}</Button>
            </DialogActions>
        </Dialog>
    );
}
