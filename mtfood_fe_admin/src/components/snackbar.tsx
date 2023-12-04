import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { stubTrue } from "lodash";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { handleSnackbarDialogClose } from "../features/authentication/authenticationSlice";
import { Alert } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function SnackbarDialog() {
    const { t } = useTranslation();
    const { snackbarState } = useAppSelector((state) => state.authentication);
    const dispatch = useAppDispatch();

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(handleSnackbarDialogClose());
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <Snackbar
                open={snackbarState.open}
                autoHideDuration={6000}
                onClose={handleClose}
                action={action}
            >
                <Alert
                    onClose={handleClose}
                    severity={snackbarState.severity}
                    sx={{ width: "100%" }}
                >
                    {snackbarState.message ? t(snackbarState.message) : ""}
                </Alert>
            </Snackbar>
        </div>
    );
}
