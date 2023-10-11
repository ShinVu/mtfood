import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";
import { Footer } from "../components/Footer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Google from "/assets/google.svg";
import Facebook from "/assets/facebook.svg";
import styled from "styled-components";
import { MuiOtpInput } from "mui-one-time-password-input";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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

export default function PasswordDialog({ handleClose }) {
    const { t } = useTranslation();
    const [showPasswords, setShowPasswords] = React.useState({
        input1: false,
        input2: false,
    });

    const handleClickShowPassword = (input) => {
        if (input === 1) {
            setShowPasswords({
                ...showPasswords,
                input1: !showPasswords.input1,
            });
        } else {
            setShowPasswords({
                ...showPasswords,
                input2: !showPasswords.input2,
            });
        }
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };
    return (
        <>
            <DialogTitle>
                <span>{t("changePassword")}</span>
            </DialogTitle>
            <DialogContent>
                <div className="flex flex-1 flex-col">
                    <FormControl className="w-96 my-2" variant="outlined">
                        <OutlinedInput
                            placeholder={t("password")}
                            id="outlined-adornment-password"
                            type={showPasswords.input1 ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() =>
                                            handleClickShowPassword(1)
                                        }
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPasswords.input1 ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl className="w-96 my-2" variant="outlined">
                        <OutlinedInput
                            placeholder={t("reEnterPassword")}
                            id="outlined-adornment-password"
                            type={showPasswords.input2 ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() =>
                                            handleClickShowPassword(2)
                                        }
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPasswords.input2 ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
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
