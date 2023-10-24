import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";
//Import element
import { TextButton } from "../../../../components/button";
import OtpInputStyled from "../../../../components/OtpInput";
import { colors } from "../../../../../public/theme";

//Import useForm
import { useForm } from "react-hook-form";

//Import yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//Email validation library
import * as EmailValidator from "email-validator";

//Import utils
import { matchIsNumeric } from "../../../../utils";
import { useAppSelector } from "../../../../hooks/reduxHook";
import {
    mailVerificationFailResponse,
    mailVerificationSuccessResponse,
} from "../../../../models/user.model";
import axiosClient from "../../../../../axios-client";

function emailValidation(value: string) {
    //Check if value is a valid email
    return EmailValidator.validate(value);
}

function accountValidation(value: string) {
    const checkEmail = emailValidation(value);

    // if value is a valid email
    if (checkEmail) {
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
        verification_code: yup.string().trim(),
    })
    .required();

function ChangeEmailDialog({
    handleClose,
    handleSubmitSuccess,
    register,
    setError,
    handleSubmit,
    errors,
}: {
    handleClose: () => void;
    handleSubmitSuccess: () => void;
    register: any;
    setError: any;
    handleSubmit: any;
    errors: any;
}) {
    const { t } = useTranslation();
    const { user } = useAppSelector((state) => state.authentication);

    const emailSubmit = (value: { account: string }) => {
        if (accountValidation(value.account).isValid) {
            const payload = {
                id: user.id,
            };
            axiosClient
                .post("/mailVerification", payload)
                .then(({ data }: { data: mailVerificationSuccessResponse }) => {
                    handleSubmitSuccess();
                })
                .catch(
                    ({
                        response,
                    }: {
                        response: mailVerificationFailResponse;
                    }) => {
                        const responseData = response.data;
                        if (response.status === 409) {
                            if (
                                responseData.message === "emailAlreadyVerified"
                            ) {
                                setError(
                                    "account",
                                    {
                                        type: "custom",
                                        message: "emailAlreadyVerified",
                                    },
                                    { shouldFocus: true }
                                );
                            }
                        }
                        handleClose(); // set loading screen;
                    }
                );
            handleSubmitSuccess();
        } else {
            setError(
                "account",
                {
                    type: "custom",
                    message: "invalidAccount",
                },
                { shouldFocus: true }
            );
        }
    };
    return (
        <>
            <DialogTitle>
                <span>{t("email")}</span>
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    type="email"
                    fullWidth
                    size="small"
                    placeholder={t("email")}
                    {...register("account")}
                />
                {errors.account && (
                    <span className="text-red_main text-sm text-medium">
                        {t(
                            errors?.account?.message
                                ? errors.account.message
                                : "defaultErrorMessage"
                        )}
                    </span>
                )}
                <DialogContentText className="mt-4">
                    <span>{t("emailChangeMessage")}</span>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <TextButton
                    onClick={handleClose}
                    sx={{ color: colors.gray[200] }}
                >
                    {t("cancel")}
                </TextButton>
                <Button onClick={handleSubmit((value) => emailSubmit(value))}>
                    {t("continue")}
                </Button>
            </DialogActions>
        </>
    );
}

function ChangeEmailVerifyDialog({
    handleClose,
    handleSubmit,
    getValues,
    handleSnackbarOpen,
}: {
    handleClose: () => void;
    getValues: any;
    handleSubmit: any;
    handleSnackbarOpen: (message: string) => void;
}) {
    const { t } = useTranslation();
    const [otp, setOtp] = React.useState("");
    const [error, setError] = React.useState("");
    const [count, setCount] = useState(60);
    const { user } = useAppSelector((state) => state.authentication);

    useEffect(() => {
        const id = setInterval(() => {
            setCount((oldCount) => oldCount - 1);
        }, 1000);
        const stopInterval = () => {
            clearInterval(id);
        };
        setTimeout(stopInterval, 2000);
        return () => {
            stopInterval();
        };
    }, []);
    const validateChar = (value: string) => {
        const valueNumber = parseInt(value, 10);
        return matchIsNumeric(valueNumber);
    };

    const handleChange = (newValue: string) => {
        setOtp(newValue);
    };

    const onSubmit = (value) => {
        if (otp.length !== 6) {
            setError("notLongEnough");
        } else {
            const payload = {
                id: user.id,
                verificationCode: otp,
            };
            axiosClient
                .post("/verifyCode", payload)
                .then(({ data }: { data: any }) => {
                    handleClose();
                    handleSnackbarOpen("updateEmailSuccess", "success");
                })
                .catch(({ response }: { response: any }) => {
                    const responseData = response.data;
                    if (response.status === 409) {
                        if (responseData.message === "emailAlreadyVerified") {
                            setError(responseData.message);
                        }
                        if (
                            responseData.message === "verificationCodeIncorrect"
                        ) {
                            setError(responseData.message);
                        }
                    } else if (response.status === 500) {
                        setError("serverError");
                    }
                });
            // handleClose();
        }
    };
    return (
        <>
            <DialogTitle>
                <span>{t("emailVerify")}</span>
            </DialogTitle>
            <DialogContent>
                <DialogContentText className="">
                    <span>{t("emailVerifyMessage")}:</span>
                </DialogContentText>
                <DialogContentText className="mb-4">
                    <span className="text-black font-semibold">
                        {getValues("account")}
                    </span>
                </DialogContentText>
                <OtpInputStyled
                    otp={otp}
                    handleChange={handleChange}
                    validateChar={validateChar}
                />
                <div className="mt-3">
                    {error !== "" && (
                        <span className="text-red_main text-sm text-medium">
                            {t(error)}
                        </span>
                    )}
                </div>
                <div className="mt-4">
                    {count !== 0 ? (
                        <>
                            <p className="text-base">
                                {t("sendCode")}: <span>{count}</span>{" "}
                            </p>
                            <p className="text-base">
                                {t("verificationTimeLimited")}
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-row items-center">
                                <p className="text-base my-0">
                                    {t("notReceived")}?
                                </p>
                                <Button
                                    variant="text"
                                    sx={{ textTransform: "none" }}
                                >
                                    {t("resendCode")}
                                </Button>
                            </div>
                            <p className="text-base">
                                {t("verificationTimeLimited")}
                            </p>
                        </>
                    )}
                </div>
            </DialogContent>
            <DialogActions>
                <TextButton
                    onClick={handleClose}
                    sx={{ color: colors.gray[200] }}
                >
                    {t("cancel")}
                </TextButton>
                <Button onClick={handleSubmit((value) => onSubmit(value))}>
                    {t("verify")}
                </Button>
            </DialogActions>
        </>
    );
}
export default function EmailDialog({
    handleModalOpen,
    handleClose,
    handleSnackbarOpen,
}: {
    handleClose: () => void;
    handleModalOpen: () => void;
    handleSnackbarOpen: (message: string) => void;
}) {
    const [type, setType] = useState("email");
    //use react-hook-form hook
    const {
        register,
        handleSubmit,
        setError,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleSubmitSuccess = () => {
        setType("emailVerify");
    };

    switch (type) {
        case "email":
            return (
                <ChangeEmailDialog
                    handleClose={handleClose}
                    handleSubmitSuccess={handleSubmitSuccess}
                    register={register}
                    setError={setError}
                    handleSubmit={handleSubmit}
                    errors={errors}
                />
            );
        case "emailVerify":
            return (
                <ChangeEmailVerifyDialog
                    handleClose={handleClose}
                    register={register}
                    setError={setError}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    getValues={getValues}
                    handleSnackbarOpen={handleSnackbarOpen}
                />
            );
    }
}
