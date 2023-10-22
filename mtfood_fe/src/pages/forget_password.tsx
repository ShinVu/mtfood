import React, { useState, useEffect } from "react";

import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";

import IconButton from "@mui/material/IconButton";

import OutlinedInput from "@mui/material/OutlinedInput";

import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
//Import useForm
import { useForm } from "react-hook-form";
//Import yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//Import components
import Header from "../components/header";
import Footer from "../components/footer";
//Import axios client
import axiosClient from "../../axios-client";

//Import utilities

import { useLocation, useNavigate } from "react-router-dom";
import {
    signUpPasswordFailResponse,
    signUpPasswordSuccessResponse,
} from "../models/user.model";

//Import redux
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import {
    setUser,
    setToken,
    clearSignup,
    clearResetPassword,
} from "../features/authentication/authenticationSlice";

const schema = yup
    .object({
        password: yup.string().trim().required("passwordRequired"),
        reEnterPassword: yup
            .string()
            .trim()
            .required("reEnterPasswordRequired")
            .test({
                name: "fieldMatch",
                exclusive: false,
                params: {},
                message: "passwordNotMatch",
                test: (value, context) => value === context.parent.password,
            }),
    })
    .required();

export default function ForgetNewPassword() {
    const { t } = useTranslation();
    const { state } = useLocation();
    const [showPasswords, setShowPasswords] = React.useState({
        input1: false,
        input2: false,
    });

    //React router navigate
    const navigate = useNavigate();

    const [open, setOpen] = useState(false); //loading screen state
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleClickShowPassword = (input: number) => {
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

    //Open loading screen
    const handleOpen = () => {
        setOpen(true);
    };
    //Close loading screen
    const handleClose = () => {
        setOpen(false);
    };

    //Redux
    const { id, email } = useAppSelector(
        (state) => state.authentication.resetPassword
    );
    const dispatch = useAppDispatch();

    const onSubmit = (value: { password: string; reEnterPassword: string }) => {
        const payload = {
            password: value.password,
            id: id,
        };
        handleOpen();

        axiosClient
            .post("/addPassword", payload)
            .then(({ data }: { data: signUpPasswordSuccessResponse }) => {
                const { user, token } = data.result;
                //Set user, token
                dispatch(setUser(user));
                dispatch(setToken(token));
                //Clear sign up information
                dispatch(clearResetPassword(null));
                handleClose();
                navigate("/home");
            })
            .catch(({ response }: { response: signUpPasswordFailResponse }) => {
                setError("reEnterPassword", {
                    type: "custom",
                    message: "serverError",
                });
                handleClose();
            });
    };

    return (
        <div className="flex flex-col flex-1 min-h-fit h-screen w-full">
            <div className="flex flex-1 py-5 bg-signUp bg-center bg-cover justify-center items-center">
                <div className="flex flex-col p-6 bg-white shadow rounded">
                    <h1 className="uppercase text-xl font-bold">
                        {t("enterInformation")}
                    </h1>
                    <form className="flex flex-col mt-8">
                        <FormControl
                            error={errors.password ? true : false}
                            variant="standard"
                        >
                            <OutlinedInput
                                id="password"
                                type={
                                    showPasswords.input1 ? "text" : "password"
                                }
                                placeholder={t("password")}
                                aria-describedby="password-error-text"
                                className="w-96 mt-4"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() =>
                                                handleClickShowPassword(1)
                                            }
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
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
                                {...register("password")}
                            />

                            {errors.password && (
                                <FormHelperText id="password-error-text">
                                    <span className="text-red_main text-sm text-medium">
                                        {t(errors?.password?.message)}
                                    </span>
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            error={errors.reEnterPassword ? true : false}
                            variant="standard"
                            className="mt-4"
                        >
                            <OutlinedInput
                                id="reEnterPassword"
                                type={
                                    showPasswords.input2 ? "text" : "password"
                                }
                                placeholder={t("reEnterPassword")}
                                aria-describedby="re-enter-password-error-text"
                                className="w-96 mt-4"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() =>
                                                handleClickShowPassword(2)
                                            }
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
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
                                {...register("reEnterPassword")}
                            />

                            {errors.reEnterPassword && (
                                <FormHelperText id="re-enter-password-error-text">
                                    <span className="text-red_main text-sm text-medium">
                                        {t(errors?.reEnterPassword?.message)}
                                    </span>
                                </FormHelperText>
                            )}
                        </FormControl>
                    </form>

                    <div className="p-3 mt-8">
                        <Button
                            variant="contained"
                            className="w-full  bg-primary_main"
                            onClick={handleSubmit((value) => onSubmit(value))}
                        >
                            {t("continue")}
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
