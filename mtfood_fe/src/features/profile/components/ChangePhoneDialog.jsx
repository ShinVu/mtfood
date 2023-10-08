import * as React from "react";
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
import { colors } from "../../../../public/theme";
export default function ChangeNumberDialog(props) {
    const { t } = useTranslation();
    const { open, handleChangeNumberVerifyOpen, handleClose } = props;
    return (
        <div>
            <Dialog open={open === 1} onClose={handleClose}>
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
                    <Button onClick={handleChangeNumberVerifyOpen}>
                        {t("continue")}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={open === 2} onClose={handleClose}>
                <DialogTitle>
                    <span>{t("phoneNumberVerify")}</span>
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
                    <Button onClick={handleClose}>{t("verify")}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
