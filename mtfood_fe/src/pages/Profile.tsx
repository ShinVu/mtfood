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

//Import element
import { ProfileNavigation } from "../features/profile";
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
    const { id } = useParams();
    const [value, setValue] = React.useState<number | null>(2);
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
                    <div className="flex p-4 flex-1 flex-row bg-white">
                        <div className="flex flex-col w-fit">
                            <p className="text-sm font-medium my-0 text-gray-200">
                                {t("personalInformation")}
                            </p>
                            <div className="mt-2 space-y-6">
                                <div className="w-fit h-fit">
                                    <StyledBadge
                                        badgeContent={
                                            <CameraAltIcon
                                                sx={{ fontSize: 16 }}
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
                                            sx={{ width: 78, height: 78 }}
                                        />
                                    </StyledBadge>
                                </div>
                                <table>
                                    <tr>
                                        <td>
                                            {" "}
                                            <p className="text-sm font-medium my-0 text-gray-200 mr-5">
                                                {t("nameFAL")}
                                            </p>
                                        </td>
                                        <td>
                                            {" "}
                                            <TextField
                                                required
                                                size="small"
                                                id="outlined-required"
                                                placeholder={t("nameFAL")}
                                                defaultValue={user.name}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {" "}
                                            <p className="text-sm font-medium my-0 text-gray-200 mr-9">
                                                {t("gender")}
                                            </p>
                                        </td>
                                        <td>
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
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div className="flex flex-col w-fit"></div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
