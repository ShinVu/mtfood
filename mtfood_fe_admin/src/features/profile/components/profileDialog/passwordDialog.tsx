import React, { useState, useEffect } from "react";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";

import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
//Import element
import { TextButton } from "../../../../components/button";

//Import color
import { colors } from "../../../../../public/theme";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHook";
import { useForm } from "react-hook-form";

//Import yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormHelperText } from "@mui/material";
import axiosClient from "../../../../../axios-client";

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
export default function PasswordDialog({
    handleClose,
    handleSnackbarOpen,
}: {
    handleClose: () => void;
    handleSnackbarOpen: (message: string, severity: string) => void;
}) {
    const { t } = useTranslation();
    const [showPasswords, setShowPasswords] = React.useState({
        input1: false,
        input2: false,
    });

    const handleClickShowPassword = (input: 1 | 2) => {
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

    //redux
    const { user } = useAppSelector((state) => state.authentication);
    const dispatch = useAppDispatch();
    //use react-hook-form hook
    const {
        register,
        handleSubmit,
        setError,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (value: { password: string; reEnterPassword: string }) => {
        const payload = {
            password: value.password,
            id: user.id,
        };

        axiosClient
            .post("/changePassword", payload)
            .then(({ data }: { data: any }) => {
                handleClose();
                handleSnackbarOpen("passwordUpdated", "success");
            })
            .catch(({ response }: { response: any }) => {
                setError("reEnterPassword", {
                    type: "custom",
                    message: "serverError",
                });
            });
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
                            aria-describedby="password-error-text"
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
                    <FormControl className="w-96 my-2" variant="outlined">
                        <OutlinedInput
                            aria-describedby="re-enter-password-error-text"
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
