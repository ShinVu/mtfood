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
import { getItemsPerPage } from "../utils/index.js";

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

function CategoryBar({
    filter,
    setFilter,
}: {
    filter: filter;
    setFilter: any;
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
                          >
                              <p
                                  className="text-base font-medium my-0 mt-3 text-black max-w-xs w-fit line-clamp-1"
                                  key={category.id}
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

function TagBar({ filter, setFilter }: { filter: filter; setFilter: any }) {
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
    return (
        <div className="flex flex-col bg-white p-4">
            <p className="font-bold text-base my-0 text-black">{t("tag")}</p>
            <div className="mt-2">
                {productTag
                    ? productTag.map((tag) => (
                          <Tooltip
                              title={tag.name}
                              TransitionComponent={Zoom}
                              placement="top-start"
                          >
                              <p
                                  className="text-base font-medium my-0 mt-3 text-black max-w-xs w-fit line-clamp-1"
                                  key={tag.id}
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

function Filter({ filter, setFilter }: { filter: filter; setFilter: any }) {
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
    filter,
    setFilter,
}: {
    filter: filter;
    setFilter: any;
}) {
    const { t } = useTranslation();

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
                <div className="mt-5">
                    <ContainedButton className="bg-primary_main">
                        {t("apply")}
                    </ContainedButton>
                </div>
            </div>
        </div>
    );
}

function ServiceFilter({
    filter,
    setFilter,
}: {
    filter: filter;
    setFilter: any;
}) {
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
                                    name={t("voucher")}
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
                                    checked={available}
                                    onChange={handleChange}
                                    name="available"
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
                                    checked={wholesale}
                                    onChange={handleChange}
                                    name="wholesale"
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
    filter,
    setFilter,
}: {
    filter: filter;
    setFilter: any;
}) {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col w-full bg-white p-4">
            <p className="font-bold text-base my-0 capitalize text-black">
                {t("rating")}
            </p>
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
function OptionSideBar({
    filter,
    setFilter,
}: {
    filter: filter;
    setFilter: any;
}) {
    return (
        <div className="flex max-w-2/5 min-w-2/5 w-fit flex-col space-y-4">
            <CategoryBar filter={filter} setFilter={setFilter} />
            <TagBar filter={filter} setFilter={setFilter} />
            <Filter filter={filter} setFilter={setFilter} />
            <PriceFilter filter={filter} setFilter={setFilter} />
            <ServiceFilter filter={filter} setFilter={setFilter} />
            <RatingFilter filter={filter} setFilter={setFilter} />
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

const initialFilter: filter = {
    category: null,
    tag: null,
    price: {
        from: null,
        to: null,
    },
    service: {
        discount: false,
        voucher: false,
        onStock: false,
        wholesaleProduct: false,
    },
    rating: 0,
    sort: "common",
};

export default function Product() {
    const { t } = useTranslation();
    const params = useParams();
    const pageNumber = params.pageNumber ? parseInt(params.pageNumber, 10) : 1;
    const [filter, setFilter] = useState<filter>(initialFilter);
    const [products, setProduct] = useState<Array<product> | null>(null);
    const [totalPage, setTotalPage] = useState<number>(1);
    const itemsPerPage = getItemsPerPage();
    useEffect(() => {
        const fetchProducts = async () => {
            const payload = {
                category: JSON.stringify(filter.category),
                tag: JSON.stringify(filter.tag),
                price: JSON.stringify(filter.price),
                service: JSON.stringify(filter.service),
                rating: JSON.stringify(filter.rating),
                sort: filter.sort,
                offset: JSON.stringify(filter.offset),
                limit: JSON.stringify(filter.limit),
            };
            const offset = JSON.stringify(0 + itemsPerPage * pageNumber);
            const limit = JSON.stringify(itemsPerPage);
            const response = await axiosClient.get("/productByFilter", {
                params: {
                    ...payload,
                    offset: offset,
                    limit: limit,
                },
            });

            const products = response.data.result.product;

            const totalPage = response.data.result.totalPage;
            setProduct(products);
            setTotalPage(totalPage);
        };

        fetchProducts();
    }, [filter, pageNumber]);
    return (
        <div className="flex flex-1 flex-col">
            <Header />
            <div className="flex flex-row flex-1 w-full p-4 bg-background_main max-w-full space-x-4">
                <OptionSideBar filter={filter} setFilter={setFilter} />
                <div className="flex flex-col flex-1 w-full max-w-full min-w-0 min-h-0">
                    <div className="flex w-full h-96 max-w-full min-w-0 min-h-0">
                        <ImageSwiper />
                    </div>
                    <div className="bg-white flex flex-row items-center justify-between mt-5">
                        <SortTab />
                        <PaginateTab />
                    </div>
                    <div className="flex flex-1 mt-5 flex-col items-center">
                        <PaginationProducts
                            products={products}
                            totalPage={totalPage}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
