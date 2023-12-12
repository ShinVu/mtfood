import { useState } from "react";

//Import React router
import { useNavigate } from "react-router-dom";

//Import MUI

import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

//Import useForm
import { useForm } from "react-hook-form";

//Import yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//Phone validation library
import { phone } from "phone";

//Email validation library
import * as EmailValidator from "email-validator";

//Import component
import Footer from "../components/footer";
import LoadingScreen from "../components/loading";
import { OutlinedInput } from "@mui/material";

//Import axios client
import axiosClient from "../../axios-client";

//Import type
import {
    onSubmitValue,
    mailResetPasswordSuccessResponse,
    mailResetPasswordFailResponse,
} from "../models/user.model";
import { useAppDispatch } from "../hooks/reduxHook";
import {
    setResetPassword,
    setSignup,
} from "../features/authentication/authenticationSlice";

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
    })
    .required();

export default function ForgetPassword() {
    //use react router navigation hook
    const navigate = useNavigate();
    //i18-localization hook
    const { t } = useTranslation();

    //use react-hook-form hook
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [open, setOpen] = useState(false); //Loading screen state
    //Open loading screen
    const handleOpen = () => {
        setOpen(true);
    };
    //Close loading screen
    const handleClose = () => {
        setOpen(false);
    };

    //Redux
    const dispatch = useAppDispatch();

    const onSubmit = (value: onSubmitValue) => {
        //Check if account input is a valid phone number or a valid email address
        const accountValidated = accountValidation(value.account);
        if (accountValidated.isValid) {
            const payload = {
                // payload contains account value and type (type: "phoneNumber" or "email")
                email: accountValidated.account,
                type: accountValidated.type,
            };
            handleOpen(); // Set loading screen;
            axiosClient
                .post("/mailResetPassword", payload)
                .then(
                    ({ data }: { data: mailResetPasswordSuccessResponse }) => {
                        const user = data.result.user;
                        dispatch(setResetPassword(user));
                        handleClose();
                        navigate("/forgetPassword/verify");
                    }
                )
                .catch(
                    ({
                        response,
                    }: {
                        response: mailResetPasswordFailResponse;
                    }) => {
                        const responseData = response.data;
                        if (response.status === 422) {
                            if (responseData.message === "emailInvalid") {
                                setError(
                                    "account",
                                    { type: "custom", message: "emailInvalid" },
                                    { shouldFocus: true }
                                );
                            }
                        }
                        handleClose();
                    }
                );
        }

        //If account input is neither a valid phone number nor email
        else {
            setError(
                "account",
                { type: "custom", message: "invalidAccount" },
                { shouldFocus: true }
            );
        }
    };
    return (
        <div className="flex flex-col flex-1   min-h-fit h-screen w-full ">
            <div className="flex flex-1 py-5 h-full bg-signUp bg-center bg-cover justify-center items-center">
                <div className="flex  flex-col p-6 bg-white shadow space-y-6 rounded">
                    <h1 className="uppercase text-xl font-bold text-black">
                        {t("findAccount")}
                    </h1>
                    <p className="text-base font-medium my-0 text-wrap text-gray-100">
                        {t("enterAccount")}
                    </p>

                    <form className="flex w-full items-center justify-center">
                        <FormControl
                            error={errors.account ? true : false}
                            variant="standard"
                            required
                            className="w-full"
                        >
                            <OutlinedInput
                                id="account"
                                placeholder={t("account")}
                                aria-describedby="account-error-text"
                                className="w-full mt-4"
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
                    </form>
                    <div className="mt-11 self-center flex flex-col">
                        <Button
                            variant="contained"
                            className="w-full  bg-primary_main mt-4"
                            onClick={handleSubmit((value) => onSubmit(value))}
                        >
                            {t("continue")}
                        </Button>

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
            <LoadingScreen open={open} />
        </div>
    );
}
