import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

//Import MUI
import FilterListIcon from "@mui/icons-material/FilterList";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { Skeleton, TextField, Tooltip } from "@mui/material";
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
import Zoom from "@mui/material/Zoom";
//Import components
import {
    ContainedButton,
    OutlinedButton,
    TextButton,
} from "../components/button.jsx";
import PaginationProducts from "../components/paginateProduct.js";
import Header from "../components/header";
import Footer from "../components/footer";
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
    useParams,
    useSearchParams,
    SetURLSearchParams,
} from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook.js";
import axiosClient from "../../axios-client.js";
import {
    setProductCategory,
    setProductTag,
} from "../features/product/productSlice.js";
import useWindowDimensions from "../hooks/useWindowDimensions.js";
import useWindowSizeDimensions from "../hooks/useWindowResponsiveDimensions.js";
import { filter, product } from "../models/product.model.js";
import { changePriceFormat, getItemsPerPage } from "../utils/index.js";
import { useForm } from "react-hook-form";
import { colors } from "../../public/theme.js";

function CategoryBar({
    searchParams,
    setSearchParams,
}: {
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
}) {
    const { t } = useTranslation();
    const { productCategory } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchCategory = async () => {
            const response = await axiosClient.get("/category");

            if (response.status === 200) {
                const category = response.data.result.category;
                dispatch(setProductCategory(category));
            }
        };
        if (!productCategory) {
            fetchCategory();
        }
    }, [productCategory]);

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
    const handleCategoryClick = (categoryId: string) => {
        //set query string to category
        searchParams.set("category", categoryId);
        //set page back to page 0
        searchParams.set("page", String(1));
        setSearchParams(searchParams);
    };
    return (
        <div className="flex flex-col bg-white p-4">
            <p className="font-bold text-base my-0 text-black">
                {t("category")}
            </p>
            <div className="mt-2">
                {productCategory
                    ? productCategory.map((category) => (
                          <Tooltip
                              title={category.name}
                              TransitionComponent={Zoom}
                              placement="top-start"
                              key={category.id}
                          >
                              <p
                                  className="text-base font-medium my-0 mt-3 text-black max-w-xs w-fit line-clamp-1"
                                  onClick={() =>
                                      handleCategoryClick(category.id)
                                  }
                              >
                                  {category.name}
                              </p>
                          </Tooltip>
                      ))
                    : getDummy().map((key) => (
                          <Skeleton
                              variant="text"
                              className="w-full text-base mt-3"
                              key={key}
                          />
                      ))}
            </div>
        </div>
    );
}

function TagBar({
    searchParams,
    setSearchParams,
}: {
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
}) {
    const { t } = useTranslation();
    const { productTag } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchTag = async () => {
            const response = await axiosClient.get("/tag");
            if (response.status === 200) {
                const tag = response.data.result.tag;
                dispatch(setProductTag(tag));
            }
        };
        if (!productTag) {
            fetchTag();
        }
    }, [productTag]);
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
    const handleTagClick = (tagId: string) => {
        const currentTag = searchParams.get("tag");
        //If tag filter is not set yet
        if (!currentTag) {
            const newTagJSON = JSON.stringify([tagId]);
            searchParams.set("tag", newTagJSON);
        }
        //If tag filter already has values in array
        else {
            const tagArray = JSON.parse(currentTag);

            //if this tag doesn't exist => add to params
            if (tagArray.indexOf(tagId) === -1) {
                tagArray.push(tagId);
                const newTagJSON = JSON.stringify(tagArray);
                searchParams.set("tag", newTagJSON);
            }
            //if this tag exist =>remove to params
            else {
                const index = tagArray.indexOf(tagId);
                if (index > -1) {
                    // only splice array when item is found
                    tagArray.splice(index, 1); // 2nd parameter means remove one item only
                }

                //if there is more then one value after remove tag params
                if (tagArray.length > 0) {
                    const newTagJSON = JSON.stringify(tagArray);
                    searchParams.set("tag", newTagJSON);
                } else {
                    searchParams.delete("tag");
                }
            }
        }
        //set page back to page 0
        searchParams.set("page", String(1));

        //setParams
        setSearchParams(searchParams);
    };
    return (
        <div className="flex flex-col bg-white p-4">
            <p className="font-bold text-base my-0 text-black">{t("tag")}</p>
            <div className="mt-2">
                {productTag
                    ? productTag.map((tag: any) => (
                          <Tooltip
                              title={tag.name}
                              TransitionComponent={Zoom}
                              placement="top-start"
                              key={tag.id}
                          >
                              <p
                                  className="text-base font-medium my-0 mt-3 text-black max-w-xs w-fit line-clamp-1"
                                  key={tag.id}
                                  onClick={() => handleTagClick(tag.id)}
                              >
                                  {tag.name}
                              </p>
                          </Tooltip>
                      ))
                    : getDummy().map((key) => (
                          <Skeleton
                              variant="text"
                              className="w-full text-base mt-2"
                              key={key}
                          />
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
            <p className="my-0 font-bold text-xl ml-2 uppercase text-black">
                {t("filter")}
            </p>
        </div>
    );
}

function PriceFilter({
    searchParams,
    setSearchParams,
}: {
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
}) {
    const { t } = useTranslation();
    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const priceFrom = watch("price_from", "");
    const priceTo = watch("price_to", "");
    const onSubmit = (data) => {
        const _priceFrom = data.price_from;
        const _priceTo = data.price_to;
        if (!_priceFrom) {
            searchParams.delete("price_from");
        } else {
            searchParams.set("price_from", _priceFrom);
        }

        if (!_priceTo) {
            searchParams.delete("price_to");
        } else {
            searchParams.set("price_to", _priceTo);
        }
        //Reset page
        searchParams.set("page", String(1));

        setSearchParams(searchParams);
    };
    return (
        <div className="flex flex-col bg-white p-4">
            <p className="font-bold text-base my-0 text-black">
                {t("priceRange")}
            </p>
            <div className="mt-4 flex flex-col items-center">
                <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">đ</InputAdornment>
                        ),
                    }}
                    placeholder={t("from")}
                    value={priceFrom}
                    {...register("price_from")}
                />
                <HorizontalRuleIcon />
                <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">đ</InputAdornment>
                        ),
                    }}
                    placeholder={t("to")}
                    type="number"
                    value={priceTo}
                    {...register("price_to")}
                    // {...register("price_to", {
                    //     valueAsNumber: true,

                    //     validate: (value) => value > 0,
                    // })}
                />
                <div className="mt-5">
                    <ContainedButton
                        className="bg-primary_main"
                        onClick={handleSubmit(onSubmit)}
                    >
                        {t("apply")}
                    </ContainedButton>
                </div>
            </div>
        </div>
    );
}

function ServiceFilter({
    searchParams,
    setSearchParams,
}: {
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
}) {
    const { t } = useTranslation();
    const [state, setState] = React.useState({
        discount: false,
        voucher: false,
        onStock: false,
        wholesaleProduct: false,
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });

        if (event.target.checked) {
            searchParams.set(event.target.name, JSON.stringify(true));
        } else {
            searchParams.delete(event.target.name);
        }

        //Reset page
        searchParams.set("page", String(1));

        setSearchParams(searchParams);
    };

    const { discount, voucher, onStock, wholesaleProduct } = state;
    const error =
        [discount, voucher, onStock, wholesaleProduct].filter((v) => v)
            .length !== 2;

    return (
        <div className="flex flex-col w-full bg-white p-4">
            <p className="font-bold text-base my-0 text-black">
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
                                <span className="font-medium text-sm text-black">
                                    {t("onSale")}
                                </span>
                            }
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={voucher}
                                    onChange={handleChange}
                                    name="voucher"
                                />
                            }
                            label={
                                <span className="font-medium text-sm text-black">
                                    {t("Voucher")}
                                </span>
                            }
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={onStock}
                                    onChange={handleChange}
                                    name="onStock"
                                />
                            }
                            label={
                                <span className="font-medium text-sm text-black">
                                    {t("available")}
                                </span>
                            }
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={wholesaleProduct}
                                    onChange={handleChange}
                                    name="wholesaleProduct"
                                />
                            }
                            label={
                                <span className="font-medium text-sm text-black">
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

function RatingFilter({
    searchParams,
    setSearchParams,
}: {
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
}) {
    const { t } = useTranslation();
    const handleRatingClick = (value: string) => {
        searchParams.set("rating", value);
        //Reset page
        searchParams.set("page", String(1));
        setSearchParams(searchParams);
    };

    //Possbile rating
    const ratingOptions = [5, 4, 3, 2, 1];
    return (
        <div className="flex flex-col w-full bg-white p-4">
            <p className="font-bold text-base my-0 capitalize text-black">
                {t("rating")}
            </p>
            <div className="mt-3 w-fit -ml-1 flex flex-col space-y-1">
                {ratingOptions.map((ratingOption) => (
                    <div
                        onClick={() => handleRatingClick(ratingOption)}
                        key={ratingOption}
                    >
                        <Rating
                            name="read-only"
                            value={ratingOption}
                            readOnly
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
function OptionSideBar({
    searchParams,
    setSearchParams,
}: {
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
}) {
    return (
        <div className="flex max-w-2/5 min-w-2/5 w-fit flex-col space-y-4">
            <CategoryBar
                searchParams={searchParams}
                setSearchParams={setSearchParams}
            />
            <TagBar
                searchParams={searchParams}
                setSearchParams={setSearchParams}
            />
            <Filter />
            <PriceFilter
                searchParams={searchParams}
                setSearchParams={setSearchParams}
            />
            <ServiceFilter
                searchParams={searchParams}
                setSearchParams={setSearchParams}
            />
            <RatingFilter
                searchParams={searchParams}
                setSearchParams={setSearchParams}
            />
        </div>
    );
}

function SortTab({
    searchParams,
    setSearchParams,
}: {
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
}) {
    const { t } = useTranslation();
    const value = searchParams.get("sort") ?? "common";

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        searchParams.set("sort", newValue);
        searchParams.set("page", String(1));
        setSearchParams(searchParams);
    };

    return (
        <Tabs className="flex min-w-fit" value={value} onChange={handleChange}>
            <Tab
                label={
                    <span className="text-sm font-semibold my-0">
                        {t("common")}
                    </span>
                }
                value="common"
            />

            <Tab
                label={
                    <span className="text-sm font-semibold my-0">
                        {t("mostPurchased")}
                    </span>
                }
                value="mostPurchased"
            />

            <Tab
                label={
                    <span className="text-sm font-semibold my-0">
                        {t("new")}
                    </span>
                }
                value="new"
            />

            <Tab
                label={
                    <span className="text-sm font-semibold my-0">
                        {t("priceHTL")}
                    </span>
                }
                value="priceHTL"
            />
            <Tab
                label={
                    <span className="text-sm font-semibold my-0">
                        {t("priceLTH")}
                    </span>
                }
                value="priceLTH"
            />
        </Tabs>
    );
}

function PaginateTab({
    searchParams,
    setSearchParams,
    totalPage,
}: {
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
    totalPage: number;
}) {
    const pageNumber = searchParams.get("page")
        ? parseInt(searchParams.get("page"))
        : 1;

    const handlePrevClick = () => {
        if (pageNumber !== 1) {
            searchParams.set("page", String(pageNumber - 1));
            setSearchParams(searchParams);
        }
    };

    const handleNextClick = () => {
        if (pageNumber !== totalPage) {
            searchParams.set("page", String(pageNumber + 1));
            setSearchParams(searchParams);
        }
    };
    return (
        <div className="flex flex-row items-center px-4 space-x-4">
            <p className="my-0 text-sm font-medium text-black">
                {pageNumber}/{totalPage}
            </p>
            <div className="flex flex-row items-center">
                <KeyboardArrowLeftIcon
                    onClick={handlePrevClick}
                    sx={{
                        color: colors.primary_main,
                        fontSize: 24,
                    }}
                    className={pageNumber === 1 ? "opacity-50" : undefined}
                />
                <KeyboardArrowRightIcon
                    onClick={handleNextClick}
                    sx={{ color: colors.primary_main, fontSize: 24 }}
                    className={
                        pageNumber === totalPage ? "opacity-50" : undefined
                    }
                />
            </div>
        </div>
    );
}

export default function Product() {
    const { t } = useTranslation();
    const [products, setProduct] = useState<Array<product> | null>(null);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setLoading] = useState<boolean>(false);
    const itemsPerPage = getItemsPerPage();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const pageNumber = searchParams.get("page")
                ? parseInt(searchParams.get("page"))
                : 1;
            const offset = 0 + itemsPerPage * (pageNumber - 1);
            const limit = itemsPerPage;
            const payload = {
                keyword: searchParams.get("keyword"),
                category: searchParams.get("category"),
                tag: searchParams.get("tag"),
                price_from: searchParams.get("price_from"),
                price_to: searchParams.get("price_to"),
                discount: searchParams.get("discount"),
                voucher: searchParams.get("voucher"),
                onStock: searchParams.get("onStock"),
                wholesaleProduct: searchParams.get("wholesaleProduct"),
                rating: searchParams.get("rating"),
                sort: searchParams.get("sort") ?? "common",
                offset: offset,
                limit: limit,
            };
            const response = await axiosClient.get("/productByFilter", {
                params: {
                    ...payload,
                },
            });

            const products = response.data.result.product;
            const totalPage = response.data.result.totalPage;

            setProduct(products);
            setTotalPage(totalPage);
            setLoading(false);
        };

        fetchProducts();
    }, [searchParams]);
    return (
        <div className="flex flex-1 flex-col">
            <Header />
            <div className="flex flex-row flex-1 w-full p-4 bg-background_main max-w-full space-x-4">
                <OptionSideBar
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                />
                <div className="flex flex-col flex-1 w-full max-w-full min-w-0 min-h-0">
                    <div className="flex w-full h-96 max-w-full min-w-0 min-h-0">
                        <ImageSwiper />
                    </div>
                    <div className="bg-white flex flex-row items-center justify-between mt-5">
                        <SortTab
                            searchParams={searchParams}
                            setSearchParams={setSearchParams}
                        />
                        <PaginateTab
                            searchParams={searchParams}
                            setSearchParams={setSearchParams}
                            totalPage={totalPage}
                        />
                    </div>
                    <div className="mt-4">
                        {searchParams.get("keyword") && (
                            <p>
                                {t("searchResultFor")}:
                                <span className="text-black font-bold ml-5">
                                    {searchParams.get("keyword")}
                                </span>
                            </p>
                        )}
                    </div>
                    <div className="flex flex-1 mt-5 flex-col items-center">
                        <PaginationProducts
                            products={products}
                            totalPage={totalPage}
                            isLoading={isLoading}
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
