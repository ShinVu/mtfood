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
import Footer from "../components/footer";
import GoogleSignIn from "../components/googleLogin";
import FacebookSignIn from "../components/facebookLogin";
import { useNavigate } from "react-router-dom";

//Import useForm
import { useForm } from "react-hook-form";

//Import yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//Phone validation library
import { phone } from "phone";

//Email validation library
import * as EmailValidator from "email-validator";

//Import axios client
import axiosClient from "../../axios-client";
import { useAppDispatch } from "../hooks/reduxHook";
import {
    setToken,
    setUser,
} from "../features/authentication/authenticationSlice";
import { logInFailResponse, logInSuccessResponse } from "../models/user.model";

function phoneNumberValidation(value: string) {
    //Check if value is a valid phone number in VN
    const check = phone(value, { country: "VN" });
    if (check.isValid) {
        return { isValid: check.isValid, phoneNumber: check.phoneNumber };
    } else {
        return { isvalid: check.isValid };
    }
}

function emailValidation(value: string) {
    //Check if value is a valid email
    return EmailValidator.validate(value);
}

function accountValidation(value: string) {
    const checkPhone = phoneNumberValidation(value);
    const checkEmail = emailValidation(value);
    //If value is a  valid phone number
    if (checkPhone.isValid) {
        return {
            isValid: true,
            type: "phoneNumber",
            account: checkPhone.phoneNumber,
        };
    }
    // if value is a valid email
    else if (checkEmail) {
        return { isValid: true, type: "email", account: value };
    }
    // if value not valid
    else {
        return { isValid: false };
    }
}

//Form validation schema
const schema = yup
    .object({
        account: yup.string().trim().required("accountRequired"), //account input is required
        password: yup.string().trim().required("passwordRequired"),
    })
    .required();

export default function Login() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    //password show state
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const [open, setOpen] = useState(false); //Loading screen state
    //Open loading screen
    const handleOpen = () => {
        setOpen(true);
    };
    //Close loading screen
    const handleClose = () => {
        setOpen(false);
    };

    //use react-hook-form hook
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    //Use redux
    const dispatch = useAppDispatch();

    const onSubmit = (value) => {
        const payload = {
            email: value.account,
            password: value.password,
        };
        axiosClient
            .post("/login", payload)
            .then(({ data }: { data: logInSuccessResponse }) => {
                const { user, token } = data.result;
                //Set user, token
                dispatch(setUser(user));
                dispatch(setToken(token));
                //Clear sign up information
                handleClose();
                navigate("/home");
            })
            .catch(({ response }: { response: logInFailResponse }) => {
                const responseData = response.data;
                if (response.status === 422) {
                    if (responseData.message === "emailInvalid") {
                        setError(
                            "account",
                            {
                                type: "custom",
                                message: "emailInvalid",
                            },
                            { shouldFocus: true }
                        );
                    }
                    if (responseData.message === "loginWithGoogle") {
                        setError(
                            "password",
                            {
                                type: "custom",
                                message: "loginWithGoogle",
                            },
                            { shouldFocus: true }
                        );
                    }
                    if (responseData.message === "passwordIncorrect") {
                        setError(
                            "password",
                            {
                                type: "custom",
                                message: "passwordIncorrect",
                            },
                            { shouldFocus: true }
                        );
                    }
                }
            });
    };
    return (
        <div className="flex flex-col flex-1 min-h-fit h-screen w-full ">
            <div className="flex flex-1 py-5 bg-signUp bg-center bg-cover justify-center items-center">
                <div className="flex  flex-col p-6 bg-white shadow space-y-6 rounded">
                    <h1 className="uppercase text-xl font-bold text-black">
                        {t("login")}
                    </h1>
                    <FormControl
                        error={errors.account ? true : false}
                        variant="standard"
                        required
                    >
                        <OutlinedInput
                            required
                            placeholder={t("account")}
                            className="w-96 my-2"
                            aria-describedby="account-error-text"
                            {...register("account")}
                        />
                        {errors.account && (
                            <FormHelperText id="account-error-text">
                                <span className="text-red_main text-sm text-medium">
                                    {t(
                                        errors?.account?.message
                                            ? errors.account.message
                                            : "defaultErrorMessage"
                                    )}
                                </span>
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl className="w-96 my-2" variant="outlined">
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
                            aria-describedby="password-error-text"
                            placeholder={t("password")}
                            {...register("password")}
                        />
                        {errors.password && (
                            <FormHelperText id="password-error-text">
                                <span className="text-red_main text-sm text-medium">
                                    {t(
                                        errors?.password?.message
                                            ? errors.password.message
                                            : "defaultErrorMessage"
                                    )}
                                </span>
                            </FormHelperText>
                        )}
                    </FormControl>
                    <div
                        className="self-end cursor-pointer"
                        onClick={() => navigate("/forgetPassword")}
                    >
                        <span className="text-base font-medium">
                            {t("forgotPassword")}
                        </span>
                    </div>
                    <div className="self-center  mt-5 flex flex-col">
                        <Button
                            variant="contained"
                            className="w-full bg-rich-black"
                            onClick={handleSubmit((value) => onSubmit(value))}
                        >
                            {t("login")}
                        </Button>
                        <Divider className="my-3 w-full">{t("or")}</Divider>
                        <div className="my-3">
                            <GoogleSignIn />
                        </div>
                        <div className="my-3">
                            <FacebookSignIn />
                        </div>
                        <div className="my-3 flex flex-row items-center ">
                            <p className="text-base font-medium my-0">
                                {t("NoPassword?")}
                            </p>
                            <Button onClick={() => navigate("/signup")}>
                                {t("signUpNow")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
