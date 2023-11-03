import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/header";
import Footer from "../components/footer";
import { useNavigate, useParams } from "react-router-dom";

//Import MUI
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { colors } from "../../public/theme.js";
import { TbTruckDelivery } from "react-icons/tb";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {
    Button,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { styled as mui_styled } from "@mui/material/styles";
//Import element
import {
    ContainedButton,
    OutlinedButton,
    TextButton,
} from "../components/button.jsx";

import { Review, ProductCard } from "../features/product/index.js";
import axiosClient from "../../axios-client.js";
import { product, productCart } from "../models/product.model.js";
import { changePriceFormat, isInt } from "../utils/index.js";
import useWindowSizeDimensions from "../hooks/useWindowResponsiveDimensions.js";
import { FlareSharp } from "@mui/icons-material";
import { AddAddressDialog } from "../features/profile/index.js";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook.js";
import { addProductToCart } from "../features/product/productSlice.js";
import usePriceCart from "../hooks/usePrice.js";

const StyledTableRow = mui_styled(TableRow)(({ theme }) => ({
    "& td, & th": {
        border: 0,
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

const filter = [
    { id: 1, label: "withImage" },
    { id: 2, label: "purchased" },
    { id: 3, label: "5star" },
    { id: 4, label: "4star" },
    { id: 5, label: "3star" },
    { id: 6, label: "2star" },
    { id: 7, label: "1star" },
];
function ProductMainCard({ product }: { product: product | null }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    //Address dialog state
    const [open, setOpen] = useState<boolean>(false);
    const handleModalOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    //Quantity state
    const [quantity, setQuantity] = useState<number>(1);

    //Redux state
    const { productCart } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();
    const quantitySubstract = () => {
        setQuantity(quantity > 1 ? quantity - 1 : quantity);
    };
    const quantityAdd = () => {
        setQuantity(quantity + 1);
    };

    const quantityChange = (value) => {
        const quantity = value.trim();
        if (isInt(quantity)) {
            setQuantity(parseInt(quantity));
        }
    };

    const addToCart = () => {
        const quantityForProduct = quantity;
        const productCart = { ...product, quantityForProduct, check: false };
        dispatch(addProductToCart(productCart));
    };

    const buyNow = () => {
        const quantityForProduct = quantity;
        const productCart = { ...product, quantityForProduct, check: false };
        dispatch(addProductToCart(productCart));
        navigate("/cart");
    };
    return (
        <div className="flex p-4 flex-row bg-white pl-6">
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
                            defaultValue={product?.rating}
                            precision={0.5}
                            readOnly
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
                            đ
                            {product &&
                                changePriceFormat(product?.priceDiscount)}
                        </h1>
                        <p className="text-base font-medium text-gray-100 line-through">
                            {product.max_discount_amount ? (
                                "đ" + changePriceFormat(product.price)
                            ) : (
                                <br />
                            )}
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
                                    onClick={handleModalOpen}
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
                                    onClick={quantitySubstract}
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
                                    value={quantity}
                                    onChange={(event) =>
                                        quantityChange(event.target.value)
                                    }
                                />
                                <Divider
                                    orientation="vertical"
                                    flexItem
                                    sx={{
                                        borderRightWidth: 1,
                                        bgcolor: colors.gray[100],
                                    }}
                                />
                                <IconButton
                                    aria-label="delete"
                                    onClick={quantityAdd}
                                >
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
                                onClick={addToCart}
                            >
                                {t("addToCart")}
                            </OutlinedButton>
                            <ContainedButton
                                className="min-w-fit  bg-primary_main"
                                onClick={buyNow}
                            >
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
            <AddAddressDialog
                open={open}
                handleModalOpen={handleModalOpen}
                handleClose={handleClose}
            />
        </div>
    );
}

function ProductDetailCard({ product }: { product: product | null }) {
    const { t } = useTranslation();
    return (
        <div className="flex p-4 flex-col bg-white">
            <h1 className="text-black text-xl font-bold uppercase ml-3">
                {t("productDetail")}
            </h1>
            <div className="mt-4 flex">
                <Table size="small">
                    <TableBody>
                        {listProductDetails.map((key) => (
                            <StyledTableRow key={key}>
                                <TableCell
                                    style={{
                                        width: "1px",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    <p className="font-regular text-base text-gray-100 col-span-5 md:col-span-4 lg:col-span-2 xl:col-span-3 mt-2">
                                        {t(key)}
                                    </p>
                                </TableCell>
                                <TableCell>
                                    {product ? (
                                        <p className="font-medium text-base text-black col-span-7 md:col-span-8 lg:col-span-10 xl:col-span-9 mt-2">
                                            {product[key] === "None" ||
                                            !product[key]
                                                ? "Không"
                                                : product[key]}
                                        </p>
                                    ) : (
                                        <Skeleton
                                            variant="text"
                                            className="text-base  col-span-7 md:col-span-8 lg:col-span-10 w-1/2 xl:col-span-9 mt-2"
                                        />
                                    )}
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

function ProductDescriptionCard({ product }: { product: product | null }) {
    const { t } = useTranslation();

    return (
        <div className="flex p-4 flex-col bg-white pl-6">
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

    //Images review state
    const [imageReviews, setImageReviews] = useState<any>(null);

    //Review sort state
    const [sortValue, setSortValue] = useState<number>(1);
    const handleSortValue = (value: string | number) => {
        setSortValue(parseInt(value));
    };

    //Review filter state
    const [reviewFilter, setReviewFilter] = useState<any>({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
    });
    const handleFilterClick = (filter) => {
        const id = filter.id;
        setReviewFilter({ ...reviewFilter, [id]: !reviewFilter[id] });
    };

    //Review state
    const [reviews, setReviews] = useState<any>([]);

    const size = useWindowSizeDimensions();
    const getDummy = () => {
        if (size === "2xl") {
            return Array.apply(null, Array(8)).map(function (x, i) {
                return i;
            });
        } else if (size === "xl") {
            return Array.apply(
                null,
                Array(7).map(function (x, i) {
                    return i;
                })
            );
        } else if (size === "lg") {
            return Array.apply(null, Array(5)).map(function (x, i) {
                return i;
            });
        } else if (size === "md") {
            return Array.apply(null, Array(3)).map(function (x, i) {
                return i;
            });
        } else {
            return Array.apply(null, Array(2)).map(function (x, i) {
                return i;
            });
        }
    };

    useEffect(() => {
        const fetchImageReviews = () => {
            axiosClient
                .get(`/imageReviews?product_id=${product?.id}`)
                .then(({ data }) => {
                    setImageReviews(data.result);
                })
                .catch(({ response }) => console.log(response));
        };

        if (product) {
            fetchImageReviews();
        }
    }, [product]);

    useEffect(() => {
        const fetchReviews = () => {
            axiosClient
                .get(`/productReviews?`, {
                    params: {
                        product_id: product?.id,
                        sort: sortValue, //Sort for reviews
                        filter: JSON.stringify(reviewFilter), //Filter for reviews
                    },
                })
                .then(({ data }) => {
                    if (!data.result.reviews) {
                        setReviews([]);
                    }
                    setReviews(data.result.reviews);
                })
                .catch(({ response }) => console.log(response));
        };
        if (product) {
            fetchReviews();
        }
    }, [product, sortValue, reviewFilter]);
    return (
        <div className="flex p-4 flex-col  bg-white pl-6">
            <h1 className="text-black text-xl font-bold uppercase">
                {t("reviewsProduct")}
            </h1>
            <div className="flex flex-col mt-2">
                <div className="flex flex-row space-x-10 flex-1 ">
                    {product ? (
                        <div className="flex flex-row space-x-3">
                            <p className="text-primary_main font-bold text-5xl my-0">
                                {product?.rating}
                            </p>
                            <div className="flex flex-col align-left">
                                <Rating
                                    name="simple-controlled"
                                    defaultValue={product?.rating}
                                    precision={0.5}
                                    readOnly
                                    className="-mx-1 my-0"
                                    size="small"
                                />
                                <p className="text-base font-semibold text-gray-200 my-0">
                                    {product?.nums_of_reviews} {t("rating")}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <Skeleton variant="rectangular" className="w-48 h-16" />
                    )}

                    <div className="flex flex-col w-full flex-1 space-y-10">
                        <p className="text-base font-bold my-0">
                            {t("allImages")}
                        </p>
                        <div className="flex flex-row flex-1 space-x-2">
                            {imageReviews?.images
                                ? imageReviews.images.map((image) => (
                                      <img
                                          key={image.id}
                                          src={image.image_url}
                                          className="w-24 h-24 object-center object-cover"
                                          loading="lazy"
                                      />
                                  ))
                                : getDummy().map((key: any) => (
                                      <div key={key}>
                                          <Skeleton
                                              variant="rectangular"
                                              className="w-24 h-24"
                                          />
                                      </div>
                                  ))}
                            {imageReviews?.numOfImages ? (
                                <div className="w-24 h-24 flex items-center justify-center bg-gray-200 text-white text-3xl">
                                    {imageReviews.numOfImages}+
                                </div>
                            ) : (
                                <Skeleton
                                    variant="rectangular"
                                    className="w-24 h-24"
                                />
                            )}
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
                <div className="flex flex-row  flex-wrap w-full max-w-full items-center">
                    {filter.map((filter) => (
                        <div
                            onClick={() => handleFilterClick(filter)}
                            key={filter.id}
                            className={`max-w-full text-ellipsis flex items-center align-center cursor-pointer bor ${
                                reviewFilter[filter.id] ? "bg-black" : ""
                            }`}
                        >
                            <span className="my-0">{t(filter.label)}</span>
                            {filter.id > 2 ? (
                                <StarOutlineIcon className="w-5 h-5 -mt-1 ml-1" />
                            ) : undefined}
                        </div>
                    ))}
                </div>
                <div className="min-w-fit">
                    <p className="text-base font-semibold text-gray-200 my-0">
                        {t("sort")}:
                    </p>
                </div>
                <FormControl size="small" className="m-0 mx-2 min-w-fit w-64">
                    <Select
                        value={sortValue}
                        onChange={(event) => {
                            handleSortValue(event.target.value);
                        }}
                        inputProps={{
                            "aria-label": "Without label",
                        }}
                    >
                        <MenuItem value={1}>
                            <em>{t("newest")}</em>
                        </MenuItem>
                        <MenuItem value={2}>
                            <em>{t("ratingHTL")}</em>
                        </MenuItem>
                        <MenuItem value={3}>
                            <em>{t("ratingLTH")}</em>
                        </MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Divider className="my-4" />
            <div className="flex flex-col w-full">
                {reviews ? (
                    reviews.map((review) => (
                        <Review review={review} key={review.id} />
                    ))
                ) : (
                    <div className="flex flex-row items-start">
                        <Skeleton variant="circular" className="w-10 h-10" />
                        <div className="ml-5 flex flex-col space-y-2 w-full">
                            <Skeleton
                                variant="text"
                                className="text-base w-1/2"
                            />

                            <Skeleton variant="rounded" className="w-1/4" />
                            <Skeleton
                                variant="text"
                                className="text-xs w-1/4"
                            />
                            <Skeleton
                                variant="rounded"
                                className="w-3/4 h-24"
                            />
                            <div className="flex flex-1">
                                <Skeleton
                                    variant="rounded"
                                    className="w-24 h-24"
                                />
                            </div>
                            <div className="flex m-w-fit mt-4">
                                <Button
                                    startIcon={
                                        <ThumbUpOffAltIcon
                                            sx={{ color: colors.gray[100] }}
                                            size={24}
                                        />
                                    }
                                    sx={{
                                        textTransform: "none",
                                    }}
                                >
                                    <span className="text-xs text-gray-100 my-0">
                                        {t("useful")}
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function ProductSameCategoryCard({ mainProduct }: { mainProduct: product }) {
    const { t } = useTranslation();
    const size = useWindowSizeDimensions();
    const [products, setProduct] = useState<Array<product> | null>(null);
    const getDummy = () => {
        if (size === "2xl") {
            return Array.apply(null, Array(16)).map(function (x, i) {
                return i;
            });
        } else if (size === "xl") {
            return Array.apply(
                null,
                Array(12).map(function (x, i) {
                    return i;
                })
            );
        } else if (size === "lg") {
            return Array.apply(null, Array(8)).map(function (x, i) {
                return i;
            });
        } else if (size === "md") {
            return Array.apply(null, Array(8)).map(function (x, i) {
                return i;
            });
        } else {
            return Array.apply(null, Array(4)).map(function (x, i) {
                return i;
            });
        }
    };
    useEffect(() => {
        const getLimit = (size: string) => {
            if (size === "sm") {
                return 4;
            } else if (size === "xs") {
                return 4;
            } else if (size === "md") {
                return 8;
            } else if (size === "lg") {
                return 12;
            } else if (size === "xl") {
                return 16;
            } else if (size === "2xl") {
                return 16;
            }
        };
        const limit = getLimit(size);
        const fetchProduct = () => {
            axiosClient
                .get(
                    `/productByCategory?category_id=${mainProduct.category_id}&limit=${limit}`
                )
                .then(({ data }: { data: any }) => {
                    const products: Array<product> = data.result.products;
                    console.log(data);
                    setProduct(products);
                });
        };
        if (!products && mainProduct) {
            fetchProduct();
        }
    }, [products, mainProduct]);
    return (
        <div className="flex p-4 flex-col  bg-white pl-6">
            <h1 className="text-black text-xl font-bold uppercase">
                {t("sameCatProduct")}
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mt-4">
                {products
                    ? products.map((product) => (
                          <ProductCard
                              product={product}
                              className="w-full min-w-fit h-fit"
                              key={product.id}
                              loading="lazy"
                          />
                      ))
                    : getDummy().map((value) => (
                          <span key={value}>
                              <Skeleton className="w-40 h-64" />
                          </span>
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
        <div className="flex p-4 flex-col  bg-white pl-6">
            <h1 className="text-black text-xl font-bold uppercase">
                {t("recommendProduct")}
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mt-4">
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
        window.scrollTo(0, 0);
    }, [id]);

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
                <ProductSameCategoryCard mainProduct={product} />
                <ProductRecommendCard />
            </div>
            <Footer />
        </div>
    );
}
