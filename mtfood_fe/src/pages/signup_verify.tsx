import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import styled from "styled-components";
import OtpInputStyled from "../components/OtpInput";
import { matchIsNumeric } from "../utils";
import Header from "../components/header";
import Footer from "../components/footer";
//Import React router
import { useNavigate } from "react-router-dom";

//Import axiosClient
import axiosClient from "../../axios-client";
//React router
import { useLocation } from "react-router-dom";
import LoadingScreen from "../components/loading";

//Verify successful response type
type verifySuccessResponse = {
    message: "emailVerificationSucceed";
    result: {
        user: {
            id: string;
        };
    };
};

//Verify fail response type
type verifyFailResponse = {
    status: number;
    data: {
        message: "emailAlreadyVerified" | "verificationCodeIncorrect";
        result: {};
    };
};

export default function SignUpVerify() {
    const { t } = useTranslation();
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [count, setCount] = useState(60);
    const [open, setOpen] = useState(false); //loading screen state
    //Read value from router navigation
    const { state } = useLocation();
    const navigate = useNavigate();
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

    //OTP input validation
    const validateChar = (value: string) => {
        const valueNumber = parseInt(value, 10);
        return matchIsNumeric(valueNumber);
    };
    const handleChange = (newValue: string) => {
        setOtp(newValue);
    };
    //Open loading screen
    const handleOpen = () => {
        setOpen(true);
    };
    //Close loading screen
    const handleClose = () => {
        setOpen(false);
    };
    //onSubmit
    const handleSubmit = () => {
        if (otp.length !== 6) {
            setError("verificationCodeInvalid");
        } else {
            const user = state.user;
            const payload = {
                id: user.id,
                verificationCode: otp,
            };
            handleOpen();
            axiosClient
                .post("/verifyCode", payload)
                .then(({ data }: { data: verifySuccessResponse }) => {
                    const user = data.result.user;
                    handleClose();
                    navigate("/signup/password", { state: { user } });
                })
                .catch(({ response }: { response: verifyFailResponse }) => {
                    const responseData = response.data;
                    if (response.status === 409) {
                        if (responseData.message === "emailAlreadyVerified") {
                            setError(responseData.message);
                        }
                    }
                });
        }
    };
    return (
        <div className="flex flex-col flex-1 min-h-fit h-screen w-full ">
            <div className="flex flex-1 py-5 bg-signUp bg-center bg-cover justify-center items-center">
                <div className="flex flex-col p-6 bg-white shadow rounded">
                    <h1 className="uppercase text-xl font-bold">
                        {t("enterVerificationCode")}
                    </h1>
                    <div className="mt-24 mb-12">
                        <OtpInputStyled
                            otp={otp}
                            handleChange={handleChange}
                            validateChar={validateChar}
                        />
                        {error && (
                            <p className="my-0 text-sm text-red_main mt-2">
                                {t(error)}
                            </p>
                        )}
                    </div>
                    <div className="p-3">
                        <Button
                            variant="contained"
                            className="w-full  bg-primary_main"
                            onClick={handleSubmit}
                        >
                            {t("continue")}
                        </Button>
                    </div>
                    <div className="mt-5">
                        {count !== 0 ? (
                            <>
                                <p className="text-xs font-bold">
                                    {t("sendCode")}: <span>{count}</span>{" "}
                                </p>
                                <p className="text-xs font-bold">
                                    {t("verificationTimeLimited")}
                                </p>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-row items-center">
                                    <p className="text-xs font-bold my-0">
                                        {t("notReceived")}?
                                    </p>
                                    <Button
                                        variant="text"
                                        sx={{ textTransform: "none" }}
                                    >
                                        {t("resendCode")}
                                    </Button>
                                </div>
                                <p className="text-xs font-bold ">
                                    {t("verificationTimeLimited")}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
            <LoadingScreen open={open} />
        </div>
    );
}
