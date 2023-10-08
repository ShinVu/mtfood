import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Footer } from "../components/Footer.js";
import Header from "../components/Header.jsx";
import { useParams } from "react-router-dom";
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

//Import components
import {
    ContainedButton,
    OutlinedButton,
    TextButton,
} from "../components/Button";
const StyledTableRow = mui_styled(TableRow)(({ theme }) => ({
    "& td, & th": {
        border: 0,
    },
}));

//Import element
import {
    ProfileNavigation,
    DatePicker,
    ChangePhoneDialog,
} from "../features/profile";
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
export default function Profile() {
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(0); //0: no modal , 1: change phone number modal, 2: change phone number verify modal
    const handleChangePhoneNumberOpen = () => {
        setOpen(1);
    };

    const handleChangePhoneNumberVerifyOpen = () => {
        setOpen(2);
    };

    const handleClose = () => {
        setOpen(0);
    };

    console.log(open);
    return (
        <div className="flex flex-1 flex-col">
            <Header />
            <div className="flex flex-row flex-1 w-full p-4 bg-background_main">
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
                                    >
                                        <p className="text-sm font-medium my-0 text-gray-200">
                                            {t("nameFAL")}
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            required
                                            size="small"
                                            id="outlined-required"
                                            placeholder={t("nameFAL")}
                                            defaultValue={user.name}
                                            inputProps={{
                                                style: { fontSize: 14 },
                                            }}
                                            className="w-full max-w-lg"
                                        />
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <TableCell>
                                        <p className="text-sm font-medium my-0 text-gray-200">
                                            {t("phoneNumber")}
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-row">
                                            0923123123
                                        </div>
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <TableCell>
                                        {" "}
                                        <p className="text-sm font-medium my-0 text-gray-200">
                                            {t("gender")}
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        {" "}
                                        <FormControl>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue="male"
                                                name="radio-buttons-group"
                                            >
                                                <FormControlLabel
                                                    value="male"
                                                    control={<Radio />}
                                                    label={
                                                        <span className="text-sm text-gray-200">
                                                            {t("male")}
                                                        </span>
                                                    }
                                                    sx={{
                                                        fontSize: 14,
                                                    }}
                                                />
                                                <FormControlLabel
                                                    value="female"
                                                    control={<Radio />}
                                                    label={
                                                        <span className="text-sm text-gray-200">
                                                            {t("female")}
                                                        </span>
                                                    }
                                                />

                                                <FormControlLabel
                                                    value="other"
                                                    control={<Radio />}
                                                    label={
                                                        <span className="text-sm text-gray-200">
                                                            {t("other")}
                                                        </span>
                                                    }
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <TableCell>
                                        <div className="">
                                            <p className="text-sm font-medium my-0 text-gray-200">
                                                {t("dateOfBirth")}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-row">
                                            <DatePicker className="w-full max-w-lg" />
                                        </div>
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <TableCell
                                        style={{
                                            width: "1px",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        <p className="text-sm font-medium my-0 text-gray-200">
                                            {t("identificationNumber")}
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            required
                                            size="small"
                                            id="outlined-required"
                                            placeholder={t("nameFAL")}
                                            defaultValue={user.name}
                                            inputProps={{
                                                style: { fontSize: 14 },
                                            }}
                                            className="w-full max-w-lg"
                                        />
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
                                                    12312312312312321
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <OutlinedButton
                                            className="w-fit min-w-fit"
                                            onClick={
                                                handleChangePhoneNumberOpen
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
                                                    dat.vumaple@hcmut.edu.vn
                                                </p>
                                            </div>
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
                                        <OutlinedButton className="max-w-fit">
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
                                        <OutlinedButton className="max-w-fit">
                                            {t("update")}
                                        </OutlinedButton>
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <TableCell>
                                        <p className="text-sm font-medium my-0 text-gray-200 ">
                                            {t("link")}
                                        </p>
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow>
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
                                </StyledTableRow>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
            <ChangePhoneDialog
                open={open}
                handleChangePhoneNumberOpen={handleChangePhoneNumberOpen}
                handleChangePhoneNumberVerifyOpen={
                    handleChangePhoneNumberVerifyOpen
                }
                handleClose={handleClose}
            />
            <Footer />
        </div>
    );
}
