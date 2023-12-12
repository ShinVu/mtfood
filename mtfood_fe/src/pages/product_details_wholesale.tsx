import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/header.js";
import Footer from "../components/footer.js";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";

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
    TableHead,
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
import FavoriteIcon from "@mui/icons-material/Favorite";
//Import element
import {
    ContainedButton,
    OutlinedButton,
    TextButton,
} from "../components/button.js";

import { Review, ProductCard } from "../features/product/index.js";
import axiosClient from "../../axios-client.js";
import { product, productCart } from "../models/product.model.js";
import { changePriceFormat, isInt } from "../utils/index.js";
import useWindowSizeDimensions from "../hooks/useWindowResponsiveDimensions.js";
import { FlareSharp } from "@mui/icons-material";
import { AddAddressDialog } from "../features/profile/index.js";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook.js";
import {
    addProductToCart,
    addProductToWholesaleCart,
} from "../features/product/productSlice.js";
import usePriceCart from "../hooks/usePrice.js";
import AddressDialog from "../features/profile/addressDialog.js";
import { current } from "@reduxjs/toolkit";
import {
    handleSnackbarDialogClose,
    handleSnackbarDialogOpen,
    setAddress,
} from "../features/authentication/authenticationSlice.js";
import { debounce } from "lodash";
import ProductImageSwiper from "../components/productImageSwiper.js";

const StyledTableRow = mui_styled(TableRow)(({ theme }) => ({
    "& td, & th": {
        border: 0,
    },
}));

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
function ProductMainCard({
    product,
    likeProduct,
    setLikedProduct,
}: {
    product: product | null;
    likeProduct: boolean;
    setLikedProduct: any;
}) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { addresses, user, currentAddress } = useAppSelector(
        (state) => state.authentication
    );
    const dispatch = useAppDispatch();
    useEffect(() => {
        const fetchAddress = async () => {
            const payload = {
                customerId: user.id,
            };
            const response = await axiosClient.post("/getAddress", payload);
            const newAddress = response.data.result.address;

            dispatch(setAddress(newAddress));
        };
        if (!addresses) {
            fetchAddress();
        }
    }, [addresses]);

    useEffect(() => {
        const fetchLikeStatus = () => {
            if (user && product) {
                const payload = {
                    customerId: user.id,
                    productId: product.id,
                };
                axiosClient
                    .post("/getProductLikeStatus", payload)
                    .then(({ data }) => {
                        setLikedProduct(data.result.status);
                    })
                    .catch(({ response }) =>
                        handleSnackbarDialogOpen({
                            message: response.data.message,
                            severity: "error",
                        })
                    );
            }
        };

        fetchLikeStatus();
    }, [user, product]);
    //Add to user_see_product
    useEffect(() => {
        const addUserSeeProduct = () => {
            if (user && user.id && product && product.id) {
                const payload = {
                    customerId: user.id,
                    productId: product.id,
                };
                axiosClient
                    .post("/addSeenProduct", payload)
                    .then(({ data }) => {})
                    .catch(({ response }) => {});
            }
        };

        addUserSeeProduct();
    }, [user, product]);

    //Add like product

    const handleLikeProduct = useCallback(
        debounce((user, product, likeProduct) => {
            if (user && product) {
                const payload = {
                    customerId: user.id,
                    productId: product.id,
                };
                axiosClient
                    .post("/addLikedProduct", payload)
                    .then(({ data }) => {
                        dispatch(
                            handleSnackbarDialogOpen({
                                message: data.message,
                                severity: "success",
                            })
                        );
                        setLikedProduct(!likeProduct);
                    })
                    .catch(({ response }) => {
                        dispatch(
                            handleSnackbarDialogOpen({
                                message: response.data.message,
                                severity: "error",
                            })
                        );
                    });
            }
        }, 300),
        []
    );

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
        dispatch(addProductToWholesaleCart(productCart));
    };

    const buyNow = () => {
        const quantityForProduct = quantity;
        const productCart = { ...product, quantityForProduct, check: false };
        dispatch(addProductToWholesaleCart(productCart));
        navigate("/cart");
    };

    const getFullAddress = () => {
        return `${currentAddress.address}, ${currentAddress.ward_name}, ${currentAddress.district_name}, ${currentAddress.province_name}`;
    };
    return (
        <div className="flex p-4 flex-row bg-white pl-6">
            <div className="flex flex-col items-center mr-10 w-fit h-fit">
                {product ? (
                    <img
                        src={product.image_url}
                        className="w-44 h-44 xl:w-64 xl:h-64 object-cover object-center"
                        alt={product.name}
                        loading="lazy"
                    />
                ) : (
                    <Skeleton
                        variant="rectangular"
                        className="w-44 h-44 xl:w-64 xl:h-64"
                    />
                )}
                <div className="w-64 xl:w-72 h-36 max-w-full  z-0 mt-2 p-2 flex">
                    <ProductImageSwiper images={product?.product_image} />
                </div>
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
                            <div className="mx-4 cursor-pointer">
                                {likeProduct ? (
                                    <Button
                                        component="label"
                                        variant="text"
                                        sx={{ textTransform: "none" }}
                                        className="bg-transparent"
                                        onClick={() =>
                                            handleLikeProduct(
                                                user,
                                                product,
                                                likeProduct
                                            )
                                        }
                                        startIcon={
                                            <FavoriteIcon
                                                sx={{
                                                    color: "#2e7d32",
                                                }}
                                            />
                                        }
                                    >
                                        <span className="text-base font-semibold text-gray-100 my-0">
                                            {t("favorite")}
                                        </span>
                                    </Button>
                                ) : (
                                    <Button
                                        component="label"
                                        variant="text"
                                        sx={{ textTransform: "none" }}
                                        className="bg-transparent"
                                        onClick={() =>
                                            handleLikeProduct(
                                                user,
                                                product,
                                                likeProduct
                                            )
                                        }
                                        startIcon={
                                            <FavoriteBorderIcon
                                                sx={{
                                                    color: colors.primary_main,
                                                }}
                                            />
                                        }
                                    >
                                        <span className="text-base font-semibold text-gray-100 my-0">
                                            {t("favorite")}
                                        </span>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    <p className="text-xl font-medium my-2">
                        {t("seePriceBelow")}
                    </p>

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
                                            {currentAddress && getFullAddress()}
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
                                {t("addToWholesaleCart")}
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

            <AddressDialog
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
                <p className="text-black text-base text-justify mt-2 whitespace-pre-wrap leading-10">
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
                    if (data.result) {
                        setImageReviews(data.result);
                    } else {
                        setImageReviews({ image: [], numOfImages: 0 });
                    }
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
                            {imageReviews?.numOfImages >= 0 ? (
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
                <div className="flex flex-row  flex-wrap w-full max-w-full items-center space-x-2">
                    {filter.map((filter) => (
                        <div
                            onClick={() => handleFilterClick(filter)}
                            key={filter.id}
                            className={`max-w-full text-ellipsis flex items-center align-center cursor-pointer bor p-2 ${
                                reviewFilter[filter.id]
                                    ? "bg-[#80808040] rounded"
                                    : ""
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

function ProductSameCategoryCard({
    mainProduct,
}: {
    mainProduct: product | null;
}) {
    const { t } = useTranslation();
    const navigate = useNavigate();
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

    const handleSeemore = () => {
        const path = {
            pathname: "/product",
            search: createSearchParams({
                page: String(1),
                category: mainProduct?.category_id,
            }).toString(),
        };
        navigate(path);
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
                Sản phẩm tương tự
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
            <OutlinedButton
                className="max-w-fit self-center mt-4 mb-2"
                onClick={handleSeemore}
            >
                {t("more")}
            </OutlinedButton>
        </div>
    );
}

function ProductWholesalePriceCard({ product }: { product: any }) {
    if (product) {
        return (
            <div className="p-4 bg-white flex self-center">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="text-2xl font-semibold">
                                Từ (sản phẩm)
                            </TableCell>
                            <TableCell className="text-2xl font-semibold">
                                Đến (sản phẩm)
                            </TableCell>
                            <TableCell className="text-2xl font-semibold">
                                Giá
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {product.product_wholesale_pricing.map((price: any) => (
                            <StyledTableRow>
                                <TableCell
                                    className="text-2xl font-semibold"
                                    align="center"
                                >
                                    {price.quantity_from}
                                </TableCell>
                                <TableCell
                                    className="text-2xl font-semibold"
                                    align="center"
                                >
                                    {price.quantity_to
                                        ? price.quantity_to
                                        : "----"}
                                </TableCell>
                                <TableCell
                                    className="text-2xl font-semibold text-red_main"
                                    align="right"
                                >
                                    {changePriceFormat(price.price)}đ
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}
export default function ProductWholesaleDetails() {
    const { t } = useTranslation();
    const { id } = useParams();
    const [product, setProduct] = useState<product | null>(null);
    const { user } = useAppSelector((state) => state.authentication);
    //Like product state
    const [likeProduct, setLikedProduct] = useState<boolean>(false);

    //Fetch product
    useEffect(() => {
        const fetchProduct = () => {
            axiosClient
                .get(`/productWholesaleDetail?id=${id}`, {
                    params: { customerId: user?.id },
                })
                .then(({ data }) => {
                    const product = data.result.product;
                    const likeState = data.result.likeState;

                    setProduct(product);
                    if (likeState) {
                        setLikedProduct(true);
                    }
                });
        };
        if (id) {
            setProduct(null);
        }
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
                <ProductMainCard
                    product={product}
                    likeProduct={likeProduct}
                    setLikedProduct={setLikedProduct}
                />
                <ProductWholesalePriceCard product={product} />
                <ProductDetailCard product={product} />
                <ProductDescriptionCard product={product} />
                <ProductReviewCard product={product} />
                <ProductSameCategoryCard mainProduct={product} />
            </div>
            <Footer />
        </div>
    );
}
