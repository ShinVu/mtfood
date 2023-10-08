import React, { useState } from "react";
import { Footer } from "../components/Footer";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Google from "/assets/google.svg";
import Facebook from "/assets/facebook.svg";
export default function SignUp() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col flex-1 min-h-screen w-full ">
            <div className="flex flex-1 py-5 bg-signUp bg-center bg-cover justify-center items-center">
                <div className="flex  flex-col p-4 bg-white shadow">
                    <h1 className="uppercase text-xl font-bold">
                        {t("signUp")}
                    </h1>
                    <TextField
                        required
                        label={t("account")}
                        variant="outlined"
                        className="w-96 mt-4"
                    />
                    <div className="self-center mt-7  flex flex-col">
                        <Button variant="contained" className="w-full">
                            {t("continue")}
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
                        <div className="my-3 flex flex-row items-center mx-2 ">
                            <p className="text-base font-medium my-0 ">
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
