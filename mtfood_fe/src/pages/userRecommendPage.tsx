import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

//Import MUI
import FilterListIcon from "@mui/icons-material/FilterList";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import {
    Button,
    Divider,
    Paper,
    Skeleton,
    TextField,
    Tooltip,
} from "@mui/material";
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

export default function UserRecommendProduct() {
    const { t } = useTranslation();
    const [products, setProduct] = useState<Array<product> | null>(null);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setLoading] = useState<boolean>(false);
    const itemsPerPage = getItemsPerPage();
    const { user } = useAppSelector((state) => state.authentication);
    useEffect(() => {
        const fetchProducts = async () => {
            setProduct(null);
            const pageNumber = searchParams.get("page")
                ? parseInt(searchParams.get("page"))
                : 1;
            const offset = 0 + itemsPerPage * (pageNumber - 1);
            const limit = itemsPerPage;
            const payload = {
                userId: user.id,
                numItems: limit,
            };
            const response = await axiosClient.get(
                "/getProductRecommendationUserItem",
                {
                    params: {
                        ...payload,
                    },
                }
            );

            const products = response.data.result.product;
            const totalPage = response.data.result.totalPage;

            setProduct(products);
            setTotalPage(totalPage ?? 1);
        };

        fetchProducts();
    }, [searchParams]);

    const mainProductLocationRef = useRef(null);

    const handleMainProductLocationFocus = () => {
        if (mainProductLocationRef) {
            mainProductLocationRef.current?.scrollIntoView({
                behavior: "smooth",
            });
        }
    };
    return (
        <div className="flex flex-1 flex-col">
            <Header />
            <div className="flex flex-col flex-1 w-full p-20 bg-background_main max-w-full space-x-4">
                <Divider className="mx-10 my-4">
                    <h4 className="text-2xl my-0 text-primary_main">
                        Gợi ý cho bạn
                    </h4>
                </Divider>
                <div className="flex flex-1 mt-5 flex-col items-center">
                    <PaginationProducts
                        products={products}
                        totalPage={totalPage}
                        isLoading={isLoading}
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                        handleMainProductLocationFocus={
                            handleMainProductLocationFocus
                        }
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}
