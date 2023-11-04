import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
//Import MUI
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
//Import components
import Header from "../components/header";
import Footer from "../components/footer";

import {
    ContainedButton,
    OutlinedButton,
    TextButton,
} from "../components/button.jsx";
import ImageSwiper from "../components/imageSwiper.js";
import ProductSwiper from "../components/productSwiper/productSwiper.js";
import { Divider, Skeleton } from "@mui/material";
import { createSearchParams, useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client.js";
import useWindowSizeDimensions from "../hooks/useWindowResponsiveDimensions.js";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook.js";
import {
    setProductCategory,
    setProductDiscount,
    setProductMostLiked,
    setProductNew,
    setProductTag,
} from "../features/product/productSlice.js";

type product = {
    id: number;
    name: string;
    image_url: string;
    price: string;
    is_active?: boolean;
    discount_amount: string;
};

function CategoryCardItem(props) {
    const { category } = props;
    const navigate = useNavigate();
    const handleCategoryClick = () => {
        const path = {
            pathname: "/product",
            search: createSearchParams({
                page: String(1),
                category: category.id,
            }).toString(),
        };
        navigate(path);
    };
    return (
        <div
            className="flex flex-col items-center cursor-pointer min-w-fit align-center"
            onClick={handleCategoryClick}
        >
            <img
                src="/assets/image_14.png"
                className="w-12 h-12 rounded-[6rem]"
            />
            <div className="">
                <p className="text-sm mt-2 font-medium text-black">
                    {category.name}
                </p>
            </div>
        </div>
    );
}

function TagCardItem(props) {
    const navigate = useNavigate();
    const { tag } = props;

    const handleTagClick = () => {
        const path = {
            pathname: "/product",
            search: createSearchParams({
                page: String(1),
                tag: JSON.stringify([tag.id]),
            }).toString(),
        };
        navigate(path);
    };
    return (
        <div
            className="flex flex-col items-center cursor-pointer"
            onClick={handleTagClick}
        >
            <p className="text-sm mt-2 text-black font-medium">{tag.name}</p>
        </div>
    );
}
function CategoryCard() {
    const { t } = useTranslation();
    const [categories, setCategories] = useState(null);

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
        } else {
            setCategories(productCategory);
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
        <div className="flex flex-col flex-1 bg-white p-4 shadow">
            <h5 className="font-medium my-0 text-base text-gray-100">
                {t("category")}
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-4 mt-4">
                {categories
                    ? categories.map((category) => (
                          <CategoryCardItem
                              category={category}
                              key={category.id}
                          />
                      ))
                    : getDummy().map((value) => (
                          <div
                              key={value}
                              className="flex flex-col items-center"
                          >
                              <Skeleton
                                  variant="circular"
                                  className="h-12 w-12"
                              />
                              <Skeleton
                                  variant="text"
                                  className="text-lg w-3/4"
                              />
                          </div>
                      ))}
            </div>
        </div>
    );
}

function TagCard() {
    const { t } = useTranslation();
    const [tags, setTags] = useState(null);
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
        } else {
            setTags(productTag);
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
        <div className="flex flex-col flex-1 bg-white p-4 shadow">
            <h5 className="font-medium my-0 text-base text-gray-100">
                {t("tag")}
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-4 mt-4">
                {tags
                    ? tags.map((tag) => <TagCardItem tag={tag} key={tag.id} />)
                    : getDummy().map((value) => (
                          <Skeleton variant="text" className="text-lg w-3/4" />
                      ))}
            </div>
        </div>
    );
}

function ProductSlideNewProductCard() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const size = useWindowSizeDimensions();
    const [products, setProducts] = useState<Array<product>>([]);

    const { productNew } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const getLimit = (size: string) => {
            if (size === "sm") {
                return 10;
            } else if (size === "xs") {
                return 10;
            } else if (size === "md") {
                return 15;
            } else if (size === "lg") {
                return 20;
            } else if (size === "xl") {
                return 21;
            } else if (size === "2xl") {
                return 24;
            }
        };

        const limit = getLimit(size);
        const fetchProduct = () => {
            axiosClient
                .get(`/productNew?limit=${limit}`)
                .then(({ data }: { data: any }) => {
                    const products: Array<product> = data.result.product;
                    dispatch(setProductNew(products));
                });
        };
        if (!productNew) {
            fetchProduct();
        } else {
            setProducts(productNew);
        }
    }, [productNew]);

    const handleNewProductClick = () => {
        const path = {
            pathname: "/product",
            search: createSearchParams({
                page: String(1),
                sort: "new",
            }).toString(),
        };
        navigate(path);
    };
    return (
        <div className="flex flex-col flex-1  p-4 h-fit">
            <Divider
                className="mx-10 my-4 cursor-pointer"
                onClick={handleNewProductClick}
            >
                <h4 className="text-2xl my-0 text-primary_main">
                    {t("newDish")}
                </h4>
            </Divider>
            <div className="flex w-full h-fit max-w-full shadow bg-white">
                <ProductSwiper products={products} />
            </div>
        </div>
    );
}

function ProductSlideMostLikedProductCard() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const size = useWindowSizeDimensions();
    const [products, setProducts] = useState<Array<product>>([]);

    const { productMostLiked } = useAppSelector((state) => state.product);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const getLimit = (size: string) => {
            if (size === "sm") {
                return 10;
            } else if (size === "xs") {
                return 10;
            } else if (size === "md") {
                return 15;
            } else if (size === "lg") {
                return 20;
            } else if (size === "xl") {
                return 21;
            } else if (size === "2xl") {
                return 24;
            }
        };

        const limit = getLimit(size);
        const fetchProduct = () => {
            axiosClient
                .get(`/productMostLiked?limit=${limit}`)
                .then(({ data }: { data: any }) => {
                    const products: Array<product> = data.result.product;

                    dispatch(setProductMostLiked(products));
                });
        };
        if (!productMostLiked) {
            fetchProduct();
        } else {
            setProducts(productMostLiked);
        }
    }, [productMostLiked]);

    const handleMostLikedClick = () => {
        const path = {
            pathname: "/product",
            search: createSearchParams({
                page: String(1),
                sort: "mostPurchased",
            }).toString(),
        };
        navigate(path);
    };

    return (
        <div className="flex flex-col flex-1  p-4 h-fit">
            <Divider
                className="mx-10 my-4 cursor-pointer"
                onClick={handleMostLikedClick}
            >
                <h4 className="text-2xl my-0 text-primary_main">
                    {t("mostLikedDish")}
                </h4>
            </Divider>
            <div className="flex w-full h-fit max-w-full shadow bg-white">
                <ProductSwiper products={products} />
            </div>
        </div>
    );
}

function ProductSlideDiscountProductCard() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const size = useWindowSizeDimensions();
    const [products, setProducts] = useState<Array<product>>([]);

    const { productDiscount } = useAppSelector((state) => state.product);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const getLimit = (size: string) => {
            if (size === "sm") {
                return 10;
            } else if (size === "xs") {
                return 10;
            } else if (size === "md") {
                return 15;
            } else if (size === "lg") {
                return 20;
            } else if (size === "xl") {
                return 21;
            } else if (size === "2xl") {
                return 24;
            }
        };
        const limit = getLimit(size);
        const fetchProduct = () => {
            axiosClient
                .get(`/productDiscount?limit=${limit}`)
                .then(({ data }: { data: any }) => {
                    const products: Array<product> = data.result.product;
                    dispatch(setProductDiscount(products));
                });
        };
        if (!productDiscount) {
            fetchProduct();
        } else {
            setProducts(productDiscount);
        }
    }, [productDiscount]);

    const handleDiscountClick = () => {
        const path = {
            pathname: "/product",
            search: createSearchParams({
                page: String(1),
                discount: String(true),
            }).toString(),
        };
        navigate(path);
    };

    return (
        <div className="flex flex-col flex-1  p-4 h-fit">
            <Divider
                className="mx-10 my-4 cursor-pointer"
                onClick={handleDiscountClick}
            >
                <h4 className="text-2xl my-0 text-primary_main">
                    {t("discountDish")}
                </h4>
            </Divider>
            <div className="flex w-full h-fit max-w-full shadow bg-white">
                <ProductSwiper products={products} />
            </div>
        </div>
    );
}

export default function Home() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-1 flex-col">
            <Header />
            <div className="flex flex-col flex-1 w-full p-4 bg-background_main space-y-4">
                <CategoryCard />
                <TagCard />
                <div className="w-full h-[24rem] max-w-full shadow">
                    <ImageSwiper />
                </div>
                <ProductSlideNewProductCard />
                <ProductSlideMostLikedProductCard />
                <ProductSlideDiscountProductCard />
            </div>
            <Footer />
        </div>
    );
}
