import Dialog from "@mui/material/Dialog";

import { useTranslation } from "react-i18next";
//Import element

import PhoneNumberDialog from "./phoneNumberDialog";
import EmailDialog from "./emailDialog";
import PasswordDialog from "./passwordDialog";
import PinDialog from "./pinDialog";

export default function ChangeDialog(props: {
    open: boolean;
    type: string;
    handleModalOpen: () => void;
    handleClose: () => void;
    handleSnackbarOpen: (message: string, severity: string) => void;
}) {
    const { open, type, handleModalOpen, handleClose, handleSnackbarOpen } =
        props;
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
                        handleSnackbarOpen={handleSnackbarOpen}
                    />
                );
            case "changePassword":
                return (
                    <PasswordDialog
                        handleModalOpen={handleModalOpen}
                        handleClose={handleClose}
                        handleSnackbarOpen={handleSnackbarOpen}
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
