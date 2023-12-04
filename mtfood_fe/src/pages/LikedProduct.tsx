import React, { useEffect, useState } from "react";
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
import { useAppSelector } from "../hooks/reduxHook.js";
import { useSearchParams } from "react-router-dom";
import axiosClient from "../../axios-client.js";
import PaginationProducts from "../components/paginateProduct.js";
import { product } from "../models/product.model.js";
import { getItemsPerPage } from "../utils/index.js";

export default function UserLikeProduct() {
    const { t } = useTranslation();
    const { user } = useAppSelector((state) => state.authentication);
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProduct] = useState<product[] | null>(null);
    const [totalPage, setTotalPage] = useState<number>(1);
    const itemsPerPage = getItemsPerPage();

    useEffect(() => {
        const fetchProducts = async () => {
            const pageNumber = searchParams.get("page")
                ? parseInt(searchParams.get("page"))
                : 1;
            const offset = 0 + itemsPerPage * (pageNumber - 1);
            const limit = itemsPerPage;
            const payload = {
                customerId: user.id,
                offset: offset,
                limit: limit,
            };
            const response = await axiosClient.post(
                "/getLikedProduct",
                payload
            );
            const products = response.data.result.product;
            const totalPage = response.data.result.totalPage;

            setProduct(products);
            setTotalPage(totalPage);
        };

        fetchProducts();
    }, [searchParams]);
    return (
        <div className="flex flex-1 flex-col">
            <Header />
            <div className="flex flex-row flex-1 w-full px-4 py-12 bg-background_main">
                <ProfileNavigation user={user} />
                <div className="flex flex-col flex-1 mx-12 space-y-4">
                    <p className="text-base font-bold  text-primary_main uppercase my-0">
                        {t("likedProduct")}
                    </p>

                    <div className="flex flex-1 mt-5 flex-col items-center">
                        <PaginationProducts
                            products={products}
                            totalPage={totalPage}
                            searchParams={searchParams}
                            setSearchParams={setSearchParams}
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
