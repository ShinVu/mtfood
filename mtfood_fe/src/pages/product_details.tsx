import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/header";
import Footer from "../components/footer";
import { useParams } from "react-router-dom";

//Import MUI
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { colors } from "../../public/theme.js";
import { TbTruckDelivery } from "react-icons/tb";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Button, Skeleton, TextField } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
//Import element
import {
    ContainedButton,
    OutlinedButton,
    TextButton,
} from "../components/button.jsx";

import { Review, ProductCard } from "../features/product/index.js";
import axiosClient from "../../axios-client.js";
import { product } from "../models/product.model.js";
import { changePriceFormat } from "../utils/index.js";

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
const user = {
    address: "Bạch Đằng, Quận Tân Bình, TP.HCM",
    avatar: "./assets/image_15.png",
    name: "Lorem",
};

const delivery = {
    price: "50.000",
};

const listProductDetails = [
    "category",
    "origin",
    "expDate",
    "directionForPreservation",
    "directionForUse",
    "weight",
    "pack",
    "ingredient",
];

function ProductMainCard({ product }: { product: product | null }) {
    const { t } = useTranslation();
    const [value, setValue] = useState<number | null>(2);

    return (
        <div className="flex p-4 flex-row bg-white">
            <div className="flex mr-10 w-fit h-fit">
                {product ? (
                    <img
                        src={product.image_url}
                        className="w-44 h-44 xl:w-64 xl:h-64 object-cover object-center"
                    />
                ) : (
                    <Skeleton
                        variant="rectangular"
                        className="w-44 h-44 xl:w-64 xl:h-64"
                    />
                )}
            </div>
            {product ? (
                <div className="flex flex-1 flex-col">
                    <h1 className="text-3xl font-bold uppercase text-black my-0">
                        {product.name}
                    </h1>

                    <div className="flex flex-row items-center">
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            className="-mx-1 my-0"
                            size="small"
                        />
                        <div className="flex flex-row items-center mx-4">
                            <div className="mx-2">
                                <p className="text-base font-semibold text-gray-200 my-0">
                                    {product?.nums_of_like} {t("rating")}
                                </p>
                            </div>
                            <Divider
                                orientation="vertical"
                                flexItem
                                sx={{
                                    borderRightWidth: 2,
                                    bgcolor: colors.gray[100],
                                }}
                            />
                            <div className="mx-4">
                                <Button
                                    component="label"
                                    variant="text"
                                    sx={{ textTransform: "none" }}
                                    startIcon={
                                        <FavoriteBorderIcon
                                            sx={{
                                                color: colors.primary_main,
                                            }}
                                        />
                                    }
                                    className="bg-transparent"
                                >
                                    <span className="text-base font-semibold text-gray-100 my-0">
                                        {t("favorite")}
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-red_main">
                            đ{product && changePriceFormat(product?.price)}
                        </h1>
                        <p className="text-base font-medium text-gray-100 line-through">
                            đ
                            {product &&
                                changePriceFormat(product.max_discount_amount)}
                        </p>
                    </div>
                    <Divider
                        sx={{
                            borderBottomWidth: 0.5,
                            bgcolor: colors.gray[100],
                        }}
                        className="mt-4 mb-2"
                    />
                    <div className="my-5 flex flex-1 flex-col space-y-10">
                        <div className="flex flex-row items-center">
                            <div className="">
                                <p className="text-base font-medium text-gray-100 my-0 mr-5">
                                    Vận chuyển
                                </p>
                            </div>
                            <div className="mr-5">
                                <TbTruckDelivery size={28} />
                            </div>
                            <div className="flex flex-col space-y-4">
                                <div className="flex flex-row items-center">
                                    <p className="text-base font-medium text-gray-100 my-0  mr-5">
                                        Vận chuyển tới{" "}
                                        <span className="text-base font-bold my-0 text-black ml-5">
                                            {user.address}
                                        </span>
                                    </p>
                                </div>
                                <div className="">
                                    <p className="text-base font-medium text-gray-100 my-0 mr-5">
                                        Phí vận chuyển{" "}
                                        <span className="text-base font-bold my-0 text-black ml-5">
                                            {delivery.price}đ
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex self-start">
                                <TextButton
                                    component="label"
                                    variant="text"
                                    sx={{ textTransform: "none" }}
                                    className="p-0"
                                >
                                    <span className="text-base font-semibold text-primary_main my-0">
                                        {t("change")}
                                    </span>
                                </TextButton>
                            </div>
                        </div>
                        <div className="flex flex-row items-center">
                            <div className="">
                                <p className="text-base font-medium text-gray-100 my-0 mr-5">
                                    {t("quantity")}
                                </p>
                            </div>
                            <div className="flex flex-row items-center border">
                                <IconButton
                                    aria-label="delete"
                                    className="rounded-none"
                                >
                                    <RemoveIcon className="rounded-none" />
                                </IconButton>
                                <Divider
                                    orientation="vertical"
                                    flexItem
                                    sx={{
                                        borderRightWidth: 1,
                                        bgcolor: colors.gray[100],
                                    }}
                                />
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    inputProps={{
                                        min: 0,
                                        style: { textAlign: "center" },
                                    }}
                                    sx={{
                                        width: "8ch",
                                        "& fieldset": {
                                            border: "none",
                                        },
                                    }}
                                    defaultValue={1}
                                />
                                <Divider
                                    orientation="vertical"
                                    flexItem
                                    sx={{
                                        borderRightWidth: 1,
                                        bgcolor: colors.gray[100],
                                    }}
                                />
                                <IconButton aria-label="delete">
                                    <AddIcon />
                                </IconButton>
                            </div>
                            <div className="">
                                <p className="text-base font-medium text-gray-100 my-0 ml-5">
                                    {product?.quantity_available}{" "}
                                    {t("stockAvailable")}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row space-x-4">
                            <OutlinedButton
                                className="min-w-fit"
                                startIcon={
                                    <AddShoppingCartIcon
                                        sx={{
                                            color: colors.primary_main,
                                        }}
                                    />
                                }
                            >
                                {t("addToCart")}
                            </OutlinedButton>
                            <ContainedButton className="min-w-fit  bg-primary_main">
                                {t("buyNow")}
                            </ContainedButton>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col flex-1 space-y-2">
                    <Skeleton variant="text" className="text-3xl w-1/2" />
                    <Skeleton variant="text" className="text-base w-1/3" />
                    <Skeleton variant="text" className="text-base w-1/4" />
                    <Skeleton variant="text" className="text-base w-1/4" />
                    <Divider
                        sx={{
                            borderBottomWidth: 1,
                            bgcolor: colors.gray[100],
                        }}
                    />
                    <Skeleton
                        variant="rounded"
                        className="text-base w-1/3 h-24"
                    />
                    <Skeleton
                        variant="rounded"
                        className="text-base w-1/3 h-24"
                    />
                </div>
            )}
        </div>
    );
}

function ProductDetailCard({ product }: { product: product | null }) {
    const { t } = useTranslation();
    return (
        <div className="flex p-4 flex-col bg-white">
            <h1 className="text-black text-xl font-bold uppercase">
                {t("productDetail")}
            </h1>
            <div className="mt-4 grid grid-cols-12">
                {listProductDetails.map((key) => (
                    <>
                        <p className="font-regular text-base text-gray-100 col-span-5 md:col-span-4 lg:col-span-2 xl:col-span-3 mt-2">
                            {t(key)}{" "}
                        </p>{" "}
                        {product ? (
                            <p className="font-medium text-base text-black col-span-7 md:col-span-8 lg:col-span-10 xl:col-span-9 mt-2">
                                {product[key] === "None" || !product[key]
                                    ? "Không"
                                    : product[key]}
                            </p>
                        ) : (
                            <Skeleton
                                variant="text"
                                className="text-base  col-span-7 md:col-span-8 lg:col-span-10 w-1/2 xl:col-span-9 mt-2"
                            />
                        )}
                    </>
                ))}
            </div>
        </div>
    );
}

function ProductDescriptionCard({ product }: { product: product | null }) {
    const { t } = useTranslation();

    return (
        <div className="flex p-4 flex-col bg-white">
            <h1 className="text-black text-xl font-bold uppercase">
                {t("productDescriptions")}
            </h1>
            {product?.description ? (
                <p className="text-black text-base text-justify mt-2">
                    {product.description}
                </p>
            ) : (
                <Skeleton variant="rounded" className="w-full h-44" />
            )}
        </div>
    );
}

function ProductReviewCard({ product }: { product: product | null }) {
    const { t } = useTranslation();

    return (
        <div className="flex p-4 flex-col  bg-white">
            <h1 className="text-black text-xl font-bold uppercase">
                {t("reviewsProduct")}
            </h1>
            <div className="flex flex-col">
                <div className="flex flex-row space-x-10 flex-1 ">
                    <div className="flex flex-row space-x-3">
                        <p className="text-primary_main font-bold text-5xl my-0">
                            {product?.rating}
                        </p>
                        <div className="flex flex-col align-left">
                            <Rating
                                name="simple-controlled"
                                defaultValue={product?.rating}
                                className=" my-0"
                                size="small"
                                precision={0.5}
                                readOnly
                            />
                            <p className="text-base font-semibold text-gray-200 my-0">
                                {product?.numsOfRating} {t("rating")}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col w-full flex-1 space-y-10">
                        <p className="text-base font-bold my-0">
                            {t("allImages")}
                        </p>
                        <div className="flex flex-row flex-1 space-x-2">
                            <img
                                src="/assets/image_14.png"
                                className="w-24 h-24 object-center object-cover"
                            />
                            <div className="w-24 h-24 flex items-center justify-center bg-gray-200">
                                <AddIcon
                                    sx={{ color: colors.white }}
                                    size={36}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Divider className="my-4" />
            <div className="flex flex-row flex-1 w-full items-center space-x-2">
                <div className="min-w-fit">
                    <p className="text-base font-semibold text-gray-200 my-0">
                        {t("filterBy")}:
                    </p>
                </div>
                <div className="flex flex-row  flex-wrap w-full max-w-full space-x-2 space-y-2">
                    <Chip
                        label="Chip Filled"
                        className="ml-2 mt-2 max-w-full text-ellipsis"
                    />

                    <Chip label="Chip Filled" />
                    <Chip label="Chip Filled" />
                </div>
                <div className="min-w-fit">
                    <p className="text-base font-semibold text-gray-200 my-0">
                        {t("sort")}:
                    </p>
                </div>
                <FormControl sx={{ m: 0, mx: 2, minWidth: 120 }} size="small">
                    <Select
                        value={1}
                        onChange={() => {}}
                        displayEmpty
                        inputProps={{
                            "aria-label": "Without label",
                        }}
                    >
                        <MenuItem value="">
                            <em>{t("ratingHTL")}</em>
                        </MenuItem>
                        <MenuItem value={10}>
                            <em>{t("ratingHTL")}</em>
                        </MenuItem>
                        <MenuItem value={20}>
                            <em>{t("newest")}</em>
                        </MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Divider className="my-4" />
            <div className="flex flex-col w-full">
                <Review />
                <Divider className="my-4" />
                <Review />
            </div>
        </div>
    );
}

function ProductSameCategoryCard() {
    const { t } = useTranslation();
    return (
        <div className="flex p-4 flex-col  bg-white">
            <h1 className="text-base font-bold uppercase">
                {t("sameCatProduct")}
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {productSameCat.map((product) => (
                    <ProductCard
                        product={product}
                        className="w-full min-w-fit h-fit"
                    />
                ))}
            </div>
            <OutlinedButton className="max-w-fit self-center mt-4 mb-2">
                {t("more")}
            </OutlinedButton>
        </div>
    );
}

function ProductRecommendCard() {
    const { t } = useTranslation();
    return (
        <div className="flex p-4 flex-col  bg-white">
            <h1 className="text-base font-bold uppercase">
                {t("recommendProduct")}
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {productSameCat.map((product) => (
                    <ProductCard
                        product={product}
                        className="w-full min-w-fit h-fit"
                    />
                ))}
            </div>
            <OutlinedButton className="max-w-fit self-center mt-4 mb-2">
                {t("more")}
            </OutlinedButton>
        </div>
    );
}
export default function ProductDetails() {
    const { t } = useTranslation();
    const { id } = useParams();
    const [product, setProduct] = useState<product | null>(null);

    //Fetch product
    useEffect(() => {
        const fetchProduct = () => {
            axiosClient.get(`/productDetail?id=${id}`).then(({ data }) => {
                const product = data.result.product;
                setProduct(product);
            });
        };
        fetchProduct();
    }, []);

    //Scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex flex-1 flex-col">
            <Header />
            <div className="flex flex-1 p-4 flex-col bg-background_main space-y-4">
                <p className="text-base font-bold my-0">
                    {t("home")} {">"} {t("product")} {">"}
                </p>
                <ProductMainCard product={product} />
                <ProductDetailCard product={product} />
                <ProductDescriptionCard product={product} />
                <ProductReviewCard product={product} />
                <ProductSameCategoryCard />
                <ProductRecommendCard />
            </div>
            <Footer />
        </div>
    );
}
