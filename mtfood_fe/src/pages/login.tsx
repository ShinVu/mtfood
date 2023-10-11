import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Google from "/assets/google.svg";
import Facebook from "/assets/facebook.svg";

import Header from "../components/Header";
import Footer from "../components/footer";
export default function Login() {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };
    return (
        <div className="flex flex-col flex-1 min-h-screen w-full ">
            <div className="flex flex-1 py-5 bg-signUp bg-center bg-cover justify-center items-center">
                <div className="flex  flex-col p-4 bg-white shadow">
                    <h1 className="uppercase text-xl font-bold">
                        {t("login")}
                    </h1>
                    <TextField
                        required
                        label={t("account")}
                        variant="outlined"
                        className="w-96 my-2"
                    />
                    <FormControl className="w-96 my-2" variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">
                            {t("password")}
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
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
                    <div className="self-end">
                        <span className="text-base font-medium">
                            {t("forgotPassword")}
                        </span>
                    </div>
                    <div className="self-center  mt-5 flex flex-col">
                        <Button variant="contained" className="w-full">
                            {t("login")}
                        </Button>
                        <Divider className="my-3 w-full">{t("or")}</Divider>
                        <div className="my-3">
                            <Button
                                component="label"
                                variant="contained"
                                className="w-full"
                                startIcon={
                                    <img src={Google} className="w-4 h-4" />
                                }
                            >
                                {t("logInGoogle")}
                            </Button>
                        </div>
                        <div className="my-3">
                            <Button
                                component="label"
                                variant="contained"
                                className="w-full"
                                startIcon={
                                    <img src={Facebook} className="w-4 h-4" />
                                }
                            >
                                {t("logInFacebook")}
                            </Button>
                        </div>
                        <div className="my-3 flex flex-row items-center ">
                            <p className="text-base font-medium my-0">
                                {t("NoPassword?")}
                            </p>
                            <Button>{t("signUpNow")}</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
