import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { colors } from "../../public/theme.js";
import styled from "styled-components";
//Import MUI
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled as mui_styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import FiberPinIcon from "@mui/icons-material/FiberPin";
import Google from "/assets/google.svg";
import Facebook from "/assets/facebook.svg";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
//Date time format
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

//Import useForm
import { useForm, Controller } from "react-hook-form";

//Import yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//Import components
import Header from "../components/header";
import Footer from "../components/footer";
import {
    ContainedButton,
    OutlinedButton,
    TextButton,
} from "../components/button.jsx";

const StyledTableRow = mui_styled(TableRow)(({ theme }) => ({
    "& td, & th": {
        border: 0,
    },
}));

//Import element
import {
    ProfileNavigation,
    DatePicker,
    ChangeDialog,
} from "../features/profile";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook.js";
import { Button } from "@mui/material";
import axiosClient from "../../axios-client.js";
import {
    updateProfileFailResponse,
    updateProfileSuccessResponse,
} from "../models/user.model.js";
import { setUser } from "../features/authentication/authenticationSlice.js";

const user = {
    address: "Bạch Đằng, Quận Tân Bình, TP.HCM",
    avatar: "./assets/image_15.png",
    name: "Lorem",
};

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: 10,
        bottom: 10,
        width: 28,
        height: 28,
        borderRadius: 28,
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    },
}));

//Form validation schema
const schema = yup
    .object({
        gender: yup.string().trim().required("genderRequired"),
        name: yup.string().trim().required("nameRequired"),
        dateOfBirth: yup.string().trim().required("dateOfBirthRequired"),
        identificationNumber: yup
            .string()
            .trim()
            .required("identificationNumberRequired"),
    })
    .required();

export default function Profile() {
    const { t } = useTranslation();
    const [open, setOpen] = React.useState({ state: false, type: "" });
    const [openSnackbar, setOpenSnackbar] = React.useState({
        state: false,
        message: "",
        severity: "",
    });

    const handleSnackbarOpen = (message: string, severity: string) => {
        setOpenSnackbar({ state: true, message: message, severity: severity });
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnackbar({ state: false, message: "", severity: "" });
    };

    const handleModalOpen = (type: string) => {
        setOpen({ state: true, type: type });
    };
    const handleClose = () => {
        setOpen({ state: false, type: "" });
    };

    //redux
    const { user, token } = useAppSelector((state) => state.authentication);
    console.log(token);
    const dispatch = useAppDispatch();
    //use react-hook-form hook
    const {
        register,
        handleSubmit,
        setError,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            gender: user.gender,
            name: user.name,
            dateOfBirth: dayjs.unix(user.dateOfBirth),
            identificationNumber: user.identificationNumber,
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = (value) => {
        const payload = {
            id: user.id,
            name: value.name,
            gender: value.gender,
            dateOfBirth: value.dateOfBirth
                ? dayjs(value.dateOfBirth).unix()
                : null,
            identificationNumber: value.identificationNumber,
        };
        axiosClient
            .post("/updateProfile", payload)
            .then(({ data }: { data: updateProfileSuccessResponse }) => {
                const { user } = data.result;
                //Set user, token
                dispatch(setUser(user));
                //Inform
                handleSnackbarOpen(data.message, "success");
            })
            .catch(({ response }: { response: updateProfileFailResponse }) => {
                const responseData = response.data;
                if (response.status === 401) {
                    if (responseData.message === "invalidAccess") {
                        handleSnackbarOpen(responseData.message, "error");
                    }
                }
            });
    };
    return (
        <div className="flex flex-1 flex-col">
            <Header />

            <div className="flex flex-row flex-1 w-full px-4 py-12 bg-background_main">
                <ProfileNavigation user={user} />
                <div className="flex flex-col flex-1 mx-12 space-y-4">
                    <div>
                        <p className="text-base font-bold  text-primary_main">
                            {t("profile")}
                        </p>
                    </div>
                    <div className="flex p-2 flex-1 flex-col xl:flex-row bg-white">
                        <div className="flex  flex-col flex-1 min-w-fit">
                            <p className="text-sm font-medium my-0 text-gray-200 mt-3 ml-3">
                                {t("personalInformation")}
                            </p>
                            <div className="w-fit h-fit my-4 mx-3">
                                <StyledBadge
                                    badgeContent={
                                        <CameraAltIcon
                                            sx={{
                                                fontSize: 16,
                                            }}
                                        />
                                    }
                                    color="primary"
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right",
                                    }}
                                >
                                    <Avatar
                                        alt={user.name}
                                        src={user.avatar}
                                        sx={{
                                            width: 78,
                                            height: 78,
                                        }}
                                    />
                                </StyledBadge>
                            </div>
                            <Table className="" size="small">
                                <StyledTableRow>
                                    <TableCell
                                        style={{
                                            width: "1px",
                                            whiteSpace: "nowrap",
                                        }}
                                        className="align-top py-3"
                                    >
                                        <p className="text-sm font-medium my-0 text-gray-200">
                                            {t("nameFAL")}
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col space-y-1">
                                            <TextField
                                                required
                                                size="small"
                                                id="outlined-required"
                                                placeholder={t("nameFAL")}
                                                inputProps={{
                                                    style: { fontSize: 14 },
                                                }}
                                                className="w-full max-w-lg"
                                                {...register("name")}
                                            />
                                            {errors.name && (
                                                <span className="text-red_main text-sm text-medium">
                                                    {t(
                                                        errors?.name?.message
                                                            ? errors.name
                                                                  .message
                                                            : "defaultErrorMessage"
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <TableCell className="align-top py-3">
                                        <p className="text-sm font-medium my-0 text-gray-200">
                                            {t("phoneNumber")}
                                        </p>
                                    </TableCell>
                                    <TableCell className="align-top py-3">
                                        <div className="flex flex-row text-black text-sm">
                                            {user.phoneNumber
                                                ? user.phoneNumber
                                                : t("notRegistered")}
                                        </div>
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <TableCell className="align-top py-3">
                                        {" "}
                                        <p className="text-sm font-medium my-0 text-gray-200">
                                            {t("gender")}
                                        </p>
                                    </TableCell>
                                    <TableCell className="py-0">
                                        <div className="flex h-full w-full flex-col align-top">
                                            <FormControl className="mb-0">
                                                <Controller
                                                    control={control}
                                                    name="gender"
                                                    render={({ field }) => (
                                                        <RadioGroup
                                                            row
                                                            defaultValue={
                                                                user.gender
                                                                    ? user.gender
                                                                    : "0"
                                                            }
                                                            {...field}
                                                        >
                                                            <FormControlLabel
                                                                value="0"
                                                                control={
                                                                    <Radio />
                                                                }
                                                                label={
                                                                    <span className="text-sm text-gray-200">
                                                                        {t(
                                                                            "male"
                                                                        )}
                                                                    </span>
                                                                }
                                                                sx={{
                                                                    fontSize: 14,
                                                                }}
                                                            />
                                                            <FormControlLabel
                                                                value="1"
                                                                control={
                                                                    <Radio />
                                                                }
                                                                label={
                                                                    <span className="text-sm text-gray-200">
                                                                        {t(
                                                                            "female"
                                                                        )}
                                                                    </span>
                                                                }
                                                            />

                                                            <FormControlLabel
                                                                value="2"
                                                                control={
                                                                    <Radio />
                                                                }
                                                                label={
                                                                    <span className="text-sm text-gray-200">
                                                                        {t(
                                                                            "other"
                                                                        )}
                                                                    </span>
                                                                }
                                                            />
                                                        </RadioGroup>
                                                    )}
                                                />
                                            </FormControl>
                                            {errors.gender && (
                                                <span className="text-red_main text-sm text-medium">
                                                    {t(
                                                        errors?.gender?.message
                                                            ? errors.gender
                                                                  .message
                                                            : "defaultErrorMessage"
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <TableCell className="align-top py-3">
                                        <div className="">
                                            <p className="text-sm font-medium my-0 text-gray-200">
                                                {t("dateOfBirth")}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="align-top">
                                        <div className="flex flex-col space-y-1">
                                            <Controller
                                                name="dateOfBirth"
                                                control={control}
                                                render={({ field }) => (
                                                    <DatePicker
                                                        className="w-full max-w-lg"
                                                        placeholderText="Select date"
                                                        onChange={(date) =>
                                                            field.onChange(date)
                                                        }
                                                        value={field.value}
                                                        timezone="UTC"
                                                    />
                                                )}
                                            />
                                            {errors.dateOfBirth && (
                                                <span className="text-red_main text-sm text-medium">
                                                    {t(
                                                        errors?.dateOfBirth
                                                            ?.message
                                                            ? errors.dateOfBirth
                                                                  .message
                                                            : "defaultErrorMessage"
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <TableCell
                                        style={{
                                            width: "1px",
                                            whiteSpace: "nowrap",
                                        }}
                                        className="align-top py-3"
                                    >
                                        <p className="text-sm font-medium my-0 text-gray-200">
                                            {t("identificationNumber")}
                                        </p>
                                    </TableCell>
                                    <TableCell className="align-top">
                                        <div className="flex flex-col space-y-1">
                                            <TextField
                                                required
                                                size="small"
                                                id="outlined-required"
                                                placeholder={t(
                                                    "identificationNumber"
                                                )}
                                                defaultValue={
                                                    user.identificationNumber
                                                }
                                                inputProps={{
                                                    style: { fontSize: 14 },
                                                }}
                                                className="w-full max-w-lg"
                                                {...register(
                                                    "identificationNumber"
                                                )}
                                            />
                                            {errors.identificationNumber && (
                                                <span className="text-red_main text-sm text-medium">
                                                    {t(
                                                        errors
                                                            ?.identificationNumber
                                                            ?.message
                                                            ? errors
                                                                  .identificationNumber
                                                                  .message
                                                            : "defaultErrorMessage"
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <TableCell>
                                        <Button
                                            onClick={handleSubmit((value) =>
                                                onSubmit(value)
                                            )}
                                            variant="contained"
                                            className="bg-primary_main"
                                        >
                                            {t("update")}
                                        </Button>
                                    </TableCell>
                                </StyledTableRow>
                            </Table>
                        </div>
                        <Divider orientation="vertical" flexItem />
                        <div className="flex flex-col w-fit min-w-fit mt-2 xl:mt-0">
                            <Table className="" size="small">
                                <StyledTableRow>
                                    <TableCell>
                                        <p className="text-sm font-medium my-0 text-gray-200">
                                            {t("phoneNumberAndEmail")}
                                        </p>
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <TableCell>
                                        <div className="flex flex-row items-center">
                                            <PhoneIcon
                                                sx={{
                                                    fontSize: 24,
                                                    color: colors.primary_main,
                                                }}
                                            />
                                            <div className="flex flex-col ml-5">
                                                <p className="text-xs font-medium my-0 text-gray-200">
                                                    {t("phoneNumber")}
                                                </p>
                                                <p className="text-xs font-semibold my-0 text-black">
                                                    {user.phoneNumber
                                                        ? user.phoneNumber
                                                        : t("notRegistered")}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <OutlinedButton
                                            className="w-fit min-w-fit"
                                            onClick={() =>
                                                handleModalOpen("phoneNumber")
                                            }
                                        >
                                            {t("update")}
                                        </OutlinedButton>
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <TableCell>
                                        <div className="flex flex-row items-center">
                                            <EmailIcon
                                                sx={{
                                                    fontSize: 24,
                                                    color: colors.primary_main,
                                                }}
                                            />
                                            <div className="flex flex-col ml-5">
                                                <p className="text-xs font-medium my-0 text-gray-200">
                                                    {t("email")}
                                                </p>
                                                <p className="text-xs font-semibold my-0 text-black">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <OutlinedButton
                                            className="max-w-fit"
                                            onClick={() =>
                                                handleModalOpen("email")
                                            }
                                        >
                                            {t("update")}
                                        </OutlinedButton>
                                    </TableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <TableCell>
                                        <p className="text-sm font-medium my-0 text-gray-200">
                                            {t("security")}
                                        </p>
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <TableCell>
                                        <div className="flex flex-row items-center">
                                            <LockIcon
                                                sx={{
                                                    fontSize: 24,
                                                    color: colors.primary_main,
                                                }}
                                            />
                                            <p className="text-xs font-medium my-0 text-gray-200 ml-5">
                                                {t("setPassword")}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <OutlinedButton
                                            className="max-w-fit"
                                            onClick={() =>
                                                handleModalOpen(
                                                    "changePassword"
                                                )
                                            }
                                        >
                                            {t("update")}
                                        </OutlinedButton>
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <TableCell>
                                        <div className="flex flex-row items-center">
                                            <FiberPinIcon
                                                sx={{
                                                    fontSize: 24,
                                                    color: colors.primary_main,
                                                }}
                                            />
                                            <p className="text-xs font-medium my-0 text-gray-200 ml-5">
                                                {t("setPin")}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <OutlinedButton
                                            className="max-w-fit"
                                            onClick={() =>
                                                handleModalOpen("changePin")
                                            }
                                        >
                                            {t("update")}
                                        </OutlinedButton>
                                    </TableCell>
                                </StyledTableRow>
                                {/* <StyledTableRow>
                                    <TableCell>
                                        <p className="text-sm font-medium my-0 text-gray-200 ">
                                            {t("link")}
                                        </p>
                                    </TableCell>
                                </StyledTableRow> */}
                                {/* <StyledTableRow>
                                    <TableCell>
                                        <div className="flex flex-row items-center">
                                            <img
                                                src={Facebook}
                                                className="w-6 h-6"
                                            />
                                            <p className="text-xs font-medium my-0 text-gray-200 ml-5">
                                                Facebook
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <OutlinedButton className="max-w-fit">
                                            {t("update")}
                                        </OutlinedButton>
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <TableCell>
                                        <div className="flex flex-row items-center">
                                            <img
                                                src={Google}
                                                className="w-6 h-6"
                                            />
                                            <p className="text-xs font-medium my-0 text-gray-200 ml-5">
                                                Google
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <OutlinedButton className="max-w-fit">
                                            {t("update")}
                                        </OutlinedButton>
                                    </TableCell>
                                </StyledTableRow> */}
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
            <ChangeDialog
                open={open.state}
                type={open.type}
                handleModalOpen={handleModalOpen}
                handleClose={handleClose}
                handleSnackbarOpen={handleSnackbarOpen}
            />
            <Footer />
            <Snackbar
                open={openSnackbar.state}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={openSnackbar.severity}
                    sx={{ width: "100%" }}
                >
                    {t(openSnackbar.message)}
                </Alert>
            </Snackbar>
        </div>
    );
}
