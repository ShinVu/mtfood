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
import AddIcon from "@mui/icons-material/Add";
//Import components
import Header from "../components/header";
import Footer from "../components/footer";
import {
    ContainedButton,
    OutlinedButton,
    TextButton,
} from "../components/button.jsx";

import {
    ProfileNavigation,
    AddAddressDialog,
} from "../features/profile/index.js";

import { ProductCard } from "../features/product";

const StyledTableRow = mui_styled(TableRow)(({ theme }) => ({
    "& td, & th": {
        border: 0,
    },
}));

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

const productSameCat = [
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        price: "500.000",
    },
    {
        name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        price: "500.000",
    },
];

const delivery = {
    price: "50.000",
};

const listProductDetails = [
    "category",
    "origin",
    "expDate",
    "preserveInstruction",
    "useInstruction",
    "weightProduct",
    "packProtocol",
    "ingredients",
];

export default function UserSeenProduct() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-1 flex-col">
            <Header />
            <div className="flex flex-row flex-1 w-full px-4 py-12 bg-background_main">
                <ProfileNavigation user={user} />
                <div className="flex flex-col flex-1 mx-12 space-y-4">
                    <p className="text-base font-bold  text-primary_main uppercase my-0">
                        {t("seenProduct")}
                    </p>

                    <div className="flex p-2 flex-1 bg-white">
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                            {productSameCat.map((product) => (
                                <ProductCard
                                    product={product}
                                    className="w-full min-w-fit h-fit"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
