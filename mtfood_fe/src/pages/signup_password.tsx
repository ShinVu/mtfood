import React, { useState, useEffect } from "react";
import { Footer } from "../components/Footer";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
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

export default function SignUpNewPassword() {
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
        <div className="flex flex-col flex-1 min-h-screen w-full ">
            <div className="flex flex-1 py-5 bg-signUp bg-center bg-cover justify-center items-center">
                <div className="flex flex-col p-4 bg-white shadow">
                    <h1 className="uppercase text-xl font-bold">
                        {t("enterInformation")}
                    </h1>
                    <FormControl className="w-96 my-2" variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">
                            {t("password")}
                        </InputLabel>
                        <OutlinedInput
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
                            label={t("password")}
                        />
                    </FormControl>
                    <FormControl className="w-96 my-2" variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">
                            {t("reEnterPassword")}
                        </InputLabel>
                        <OutlinedInput
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
                            label={t("reEnterPassword")}
                        />
                    </FormControl>
                    <div className="p-3">
                        <Button variant="contained" className="w-full">
                            {t("continue")}
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
