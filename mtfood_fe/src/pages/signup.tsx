import React, { useState } from "react";

//Import MUI
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
//Import useForm
import { useForm } from "react-hook-form";
//Import yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//Import component
import Facebook from "/assets/facebook.svg";
import Header from "../components/header";
import Footer from "../components/Footer";
import { OutlinedInput } from "@mui/material";

import GoogleSignIn from "../components/googleLogin";
import FacebookSignIn from "../components/facebookLogin";
const schema = yup
    .object({
        account: yup.string().trim().required("accountRequired"),
    })
    .required();
export default function SignUp() {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    return (
        <div className="flex flex-col flex-1 min-h-screen w-full ">
            <div className="flex flex-1 py-5 bg-signUp bg-center bg-cover justify-center items-center">
                <div className="flex  flex-col p-4 bg-white shadow">
                    <h1 className="uppercase text-xl font-bold">
                        {t("signUp")}
                    </h1>
                    <form>
                        <FormControl
                            error={errors.account ? true : false}
                            variant="standard"
                            required
                        >
                            <OutlinedInput
                                id="account"
                                placeholder={t("account")}
                                aria-describedby="account--error-text"
                                className="w-96 mt-4"
                                {...register("account")}
                            />
                            {errors.account && (
                                <FormHelperText id="account-error-text">
                                    <span className="text-red_main text-sm text-medium">
                                        {t(errors?.account?.message)}
                                    </span>
                                </FormHelperText>
                            )}
                        </FormControl>
                    </form>
                    <div className="self-center mt-7  flex flex-col">
                        <Button
                            variant="contained"
                            className="w-full"
                            onClick={handleSubmit((d) => console.log(d))}
                        >
                            {t("continue")}
                        </Button>
                        <Divider className="my-3 w-full">{t("or")}</Divider>
                        <div className="my-3">
                            <GoogleSignIn />
                        </div>
                        <div className="my-3">
                            <FacebookSignIn />
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
