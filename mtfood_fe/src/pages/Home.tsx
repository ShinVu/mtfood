import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
//Import MUI

//Import components
import Header from "../components/header";
import Footer from "../components/footer";

import ImageSwiper from "../components/imageSwiper.js";
import ProductSwiper from "../components/productSwiper/productSwiper.js";
import { Button, Divider, Paper, Skeleton } from "@mui/material";
import { createSearchParams, useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client.js";
import useWindowSizeDimensions from "../hooks/useWindowResponsiveDimensions.js";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook.js";
import { FaBoltLightning } from "react-icons/fa6";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

import {
    setProductCategory,
    setProductDiscount,
    setProductMostLiked,
    setProductNew,
    setProductTag,
} from "../features/product/productSlice.js";

import ProductDiscountSwiper from "../components/productSwiper/productDiscountSwiper.js";

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
        <Paper
            className="flex flex-col items-center justify-center p-2 cursor-pointer min-w-fit align-center transition ease-in-out delay-150  hover:-translate-y-2 hover:scale-105 "
            elevation={1}
            onClick={handleCategoryClick}
            key={category.id}
        >
            {category.image_url && (
                <img
                    src={category.image_url}
                    className="w-20 h-20 object-cover object-center"
                    alt={category.name}
                    loading="lazy"
                />
            )}
            <p className="text-sm mt-2 font-semibold text-black uppercase">
                {category.name}
            </p>
        </Paper>
    );
}

function TagCardItem(props) {
    const { t } = useTranslation();
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
        // <Paper
        //     className="flex flex-row items-center justify-start cursor-pointer bg-[length:205%_100%] bg-gradient-to-r from-chocolate-cosmos from-50% via-white via-50% to-white to-100%  transition-all delay-100 duration-500 ease-out bg-right-bottom hover:bg-left-bottom  group p-2"
        //     onClick={handleTagClick}
        // >
        //     <div className="w-2 h-2 rounded-full mr-2 transition-all ease-out delay-200 bg-rich-black group-hover:bg-white" />
        //     <p className=" font-semibold text-base transition-all ease-out delay-200 text-rich-black group-hover:text-white uppercase">
        //         {tag.name}
        //     </p>
        // </Paper>
        <Paper
            className="bg-light-pink w-full h-48 relative flex"
            elevation={0}
        >
            <div className="absolute left-10 top-10 w-1/2">
                <p className="text-xl mt-2 font-bold text-black font-nunito">
                    {tag.name}
                </p>
                <p className="text-base font-semibold line-clamp-2">
                    {tag.description}
                </p>
                <Button
                    variant="text"
                    className="-ml-2 font-medium text-black normal-case text-base"
                    onClick={handleTagClick}
                    endIcon={<LiaLongArrowAltRightSolid />}
                >
                    {t("seeMores")}
                </Button>
            </div>
        </Paper>
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
        <div className="flex flex-col flex-1 p-4 ">
            <Divider className="mx-10 my-4 cursor-pointer">
                <h1 className="font-bold my-0 text-lg text-black uppercase">
                    {t("category")}
                </h1>
            </Divider>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6  mt-4 gap-x-2 gap-y-4">
                {categories
                    ? categories.map((category: any) => (
                          <CategoryCardItem
                              category={category}
                              key={category.id}
                          />
                      ))
                    : getDummy().map((value, index) => (
                          <div
                              key={index}
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
        <div className="flex flex-col flex-1 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  gap-y-4 gap-x-2 mt-4">
                {tags
                    ? tags
                          .slice(0, 4)
                          .map((tag) => <TagCardItem tag={tag} key={tag.id} />)
                    : getDummy().map((value, index) => (
                          <Skeleton
                              variant="text"
                              className="text-lg w-3/4"
                              key={index}
                          />
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
            <Paper
                elevation={0}
                className="flex flex-col flex-1 p-4 bg-transparent z-0"
            >
                <ProductSwiper products={products} />
            </Paper>
        </div>
    );
}

function ProductSlideRecommendationProductCard() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const size = useWindowSizeDimensions();
    const [products, setProducts] = useState<Array<product>>([]);

    const { productMostLiked } = useAppSelector((state) => state.product);
    const { user } = useAppSelector((state) => state.authentication);

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
            const payload = {
                userId: user.id,
                numItems: limit,
            };
            axiosClient
                .get(`/getProductRecommendationUserItem`, {
                    params: {
                        ...payload,
                    },
                })
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
                    Gợi ý cho bạn
                </h4>
            </Divider>
            <Paper
                elevation={0}
                className="flex flex-col flex-1 p-4   z-0 overflow-visible bg-transparent"
            >
                <ProductSwiper products={products} />
            </Paper>
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
    if (products && products.length > 0) {
        return (
            <div className="relative flex p-4 w-full h-[500px] bg-sale overflow-visible mb-36">
                {/* <Divider
                className="mx-10 my-4 cursor-pointer"
                onClick={handleDiscountClick}
            >
                <h4 className="text-2xl my-0 text-primary_main">
                    {t("discountDish")}
                </h4>
            </Divider> */}

                <Paper
                    elevation={0}
                    className="absolute top-5 right-0 w-[70%] h-fit flex flex-col flex-1 bg-transparent"
                >
                    <div className="flex flex-row items-center mb-2">
                        <FaBoltLightning className="w-8 h-8 text-red_main" />
                        <h4 className="text-2xl text-white font-bold uppercase">
                            Ăn thả ga, không lo về giá
                        </h4>
                    </div>

                    <div className="px-6 py-4 bg-orange-web  z-0 rounded-xl flex flex-col">
                        <ProductDiscountSwiper products={products} />
                        <Button
                            variant="text"
                            className="-ml-2 font-medium text-black normal-case text-base self-center"
                            onClick={handleDiscountClick}
                            endIcon={<LiaLongArrowAltRightSolid />}
                        >
                            {t("seeMores")}
                        </Button>
                    </div>
                </Paper>
            </div>
        );
    }
}

// function IntroductionCard() {
//     const { t } = useTranslation();
//     return (
//         <div className="flex flex-row mx-2 py-4 space-x-4">
//             <Paper className="w-1/4 flex flex-row items-center justify-center space-x-2 bg-light-pink py-4">
//                 <FaShippingFast className="w-10 h-10 text-gray_100" />
//                 <div>
//                     <h1 className="text-2xl font-semibold text-black">
//                         {t("freeShipping")}
//                     </h1>
//                     <p className="text-lg font-medium text-black">
//                         {t("freeShippingDescription")}
//                     </p>
//                 </div>
//             </Paper>
//             <Paper className="w-1/4 flex flex-row items-center justify-center space-x-2 bg-light-pink py-4">
//                 <FaShippingFast className="w-10 h-10 text-gray_100" />
//                 <div>
//                     <h1 className="text-2xl font-semibold text-black">
//                         {t("securePayment")}
//                     </h1>
//                     <p className="text-lg font-medium text-black">
//                         {t("securePaymentDescription")}
//                     </p>
//                 </div>
//             </Paper>
//             <Paper className="w-1/4 flex flex-row items-center justify-center space-x-2 bg-light-pink py-4">
//                 <FaShippingFast className="w-10 h-10 text-gray_100" />
//                 <div>
//                     <h1 className="text-2xl font-semibold text-black">
//                         {t("100%Satisfaction")}
//                     </h1>
//                     <p className="text-lg font-medium text-black">
//                         {t("100%SatisfactionDescription")}
//                     </p>
//                 </div>
//             </Paper>
//             <Paper className="w-1/4 flex flex-row items-center justify-center space-x-2 bg-light-pink py-4">
//                 <FaShippingFast className="w-10 h-10 text-gray_100" />
//                 <div>
//                     <h1 className="text-2xl font-semibold text-black">
//                         {t("24hSupport")}
//                     </h1>
//                     <p className="text-lg font-medium text-black">
//                         {t("24hSupportDescription")}
//                     </p>
//                 </div>
//             </Paper>
//         </div>
//     );
// }

export default function Home() {
    const { t } = useTranslation();
    const { user } = useAppSelector((state) => state.authentication);
    return (
        <div className="flex flex-1 flex-col">
            <Header />
            <div className="w-full h-[28rem] max-w-full shadow z-0">
                <ImageSwiper />
            </div>
            <div className="flex flex-col flex-1 w-full p-4 bg-background_main">
                <CategoryCard />
                <TagCard />
                <ProductSlideDiscountProductCard />
                <ProductSlideNewProductCard />
                {user && <ProductSlideRecommendationProductCard />}
            </div>

            <Footer />
        </div>
    );
}
