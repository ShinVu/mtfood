import React, { useState } from "react";
import { useTranslation } from "react-i18next";

//Import MUI
import FilterListIcon from "@mui/icons-material/FilterList";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import Rating from "@mui/material/Rating";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
//Import components
import {
    ContainedButton,
    OutlinedButton,
    TextButton,
} from "../components/button.jsx";
import PaginatedProducts from "../components/paginateProduct.js";
import Header from "../components/header";
import Footer from "../components/Footer";
import ImageSwiper from "../components/imageSwiper.js";

//Import React router
import PropTypes from "prop-types";
import {
    MemoryRouter,
    Route,
    Routes,
    Link,
    matchPath,
    useLocation,
} from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";

const categories = [
    { name: "Kho bo" },
    { name: "Kho bo" },
    { name: "Kho bo" },
    { name: "Kho bo" },
    { name: "Kho bo" },
    { name: "Kho bo" },
    { name: "Kho bo" },
    { name: "Kho bo" },
];

const tags = [
    {
        name: "mon an chay",
    },
    {
        name: "mon an chay",
    },
    {
        name: "mon an chay",
    },
];

function CategoryBar() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col bg-white p-4">
            <p className="font-bold text-base my-0">{t("category")}</p>
            <div className="mt-2">
                {categories.map((category) => (
                    <p
                        className="text-sm font-medium my-0 mt-2"
                        key={category.name}
                    >
                        {category.name}
                    </p>
                ))}
            </div>
        </div>
    );
}

function TagBar() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col bg-white p-4">
            <p className="font-bold text-base my-0">{t("tag")}</p>
            <div className="mt-2">
                {tags.map((tag) => (
                    <p className="text-sm font-medium my-0 mt-2" key={tag.name}>
                        {tag.name}
                    </p>
                ))}
            </div>
        </div>
    );
}

function Filter() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-row items-center">
            <FilterListIcon sx={{ fontSize: 40 }} />
            <p className="my-0 font-bold text-xl ml-2 uppercase">
                {t("filter")}
            </p>
        </div>
    );
}

function PriceFilter() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col bg-white p-4">
            <p className="font-bold text-base my-0">{t("priceRange")}</p>
            <div className="mt-4 flex flex-col items-center space-y-1">
                <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">đ</InputAdornment>
                        ),
                    }}
                    sx={{ width: "22ch" }}
                    placeholder={t("from")}
                />
                <HorizontalRuleIcon />
                <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">đ</InputAdornment>
                        ),
                    }}
                    sx={{ width: "22ch" }}
                    placeholder={t("to")}
                />
                <ContainedButton className="mt-3">{t("apply")}</ContainedButton>
            </div>
        </div>
    );
}

function ServiceFilter() {
    const { t } = useTranslation();
    const [state, setState] = React.useState({
        discount: false,
        voucher: false,
        available: false,
        wholesale: false,
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const { discount, voucher, available, wholesale } = state;
    const error =
        [discount, voucher, available, wholesale].filter((v) => v).length !== 2;

    return (
        <div className="flex flex-col w-full bg-white p-4">
            <p className="font-bold text-base my-0">
                {t("serviceAndDiscount")}
            </p>
            <div className="mt-2 w-fit ">
                <FormControl component="fieldset" variant="standard">
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={discount}
                                    onChange={handleChange}
                                    name="discount"
                                />
                            }
                            label={
                                <span className="font-medium text-sm">
                                    {t("onSale")}
                                </span>
                            }
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={voucher}
                                    onChange={handleChange}
                                    name={t("voucher")}
                                />
                            }
                            label={
                                <span className="font-medium text-sm">
                                    {t("Voucher")}
                                </span>
                            }
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={available}
                                    onChange={handleChange}
                                    name="available"
                                />
                            }
                            label={
                                <span className="font-medium text-sm">
                                    {t("available")}
                                </span>
                            }
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={wholesale}
                                    onChange={handleChange}
                                    name="wholesale"
                                />
                            }
                            label={
                                <span className="font-medium text-sm">
                                    {t("wholesaleProduct")}
                                </span>
                            }
                        />
                    </FormGroup>
                </FormControl>
            </div>
        </div>
    );
}

function RatingFilter() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col w-full bg-white p-4">
            <p className="font-bold text-base my-0 capitalize">{t("rating")}</p>
            <div className="mt-3 w-fit -ml-1 flex flex-col space-y-1">
                <Rating name="read-only" value={5} readOnly />
                <Rating name="read-only" value={4} readOnly />
                <Rating name="read-only" value={3} readOnly />
                <Rating name="read-only" value={2} readOnly />
                <Rating name="read-only" value={1} readOnly />
            </div>
        </div>
    );
}
function OptionSideBar() {
    return (
        <div className="flex max-w-2/5 min-w-2/5 w-fit flex-col space-y-4">
            <CategoryBar />
            <TagBar />
            <Filter />
            <PriceFilter />
            <ServiceFilter />
            <RatingFilter />
        </div>
    );
}

function SortTab() {
    const { t } = useTranslation();
    return (
        <Tabs value={0} className="flex min-w-fit">
            <Tab
                label={
                    <span className="text-sm font-semibold my-0">
                        {t("all")}
                    </span>
                }
                value="0"
                to="/user/order/0"
                component={Link}
            />

            <Tab
                label={
                    <span className="text-sm font-semibold my-0">
                        {t("waitingPayment")}
                    </span>
                }
                value="1"
                to="/user/order/1"
                component={Link}
            />

            <Tab
                label={
                    <span className="text-sm font-semibold my-0">
                        {t("preparing")}
                    </span>
                }
                value="2"
                to="/user/order/2"
                component={Link}
            />

            <Tab
                label={
                    <span className="text-sm font-semibold my-0">
                        {t("preparing")}
                    </span>
                }
                value="3"
                to="/user/order/3"
                component={Link}
            />
        </Tabs>
    );
}

function PaginateTab() {
    return (
        <div className="flex flex-row items-center px-4 space-x-4">
            <p className="my-0 text-sm font-medium">1/50</p>
            <div className="flex flex-row items-center">
                <KeyboardArrowLeftIcon />
                <KeyboardArrowRightIcon />
            </div>
        </div>
    );
}
export default function Product() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-1 flex-col">
            <Header />
            <div className="flex flex-row flex-1 w-full p-4 bg-background_main max-w-full space-x-4">
                <OptionSideBar />
                <div className="flex flex-col flex-1 w-full max-w-full min-w-0 min-h-0">
                    <div className="flex w-full h-96 max-w-full min-w-0 min-h-0">
                        <ImageSwiper />
                    </div>
                    <div className="bg-white flex flex-row items-center justify-between mt-5">
                        <SortTab />
                        <PaginateTab />
                    </div>
                    <div className="flex flex-1 mt-5 flex-col items-center">
                        <PaginatedProducts />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
