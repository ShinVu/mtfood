import React, { useState, useRef, useCallback, useEffect } from "react";
import { ProductCard } from "../../features/product";
// import Swiper core and required modules
import { Navigation, Scrollbar, A11y } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "./styles.css";
import "swiper/css/scrollbar";
// Import MUI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import { CardActionArea } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
//import react router dom
import { useNavigate } from "react-router-dom";
import useWindowSizeDimensions from "../../hooks/useWindowResponsiveDimensions";
import { changePriceFormat, getDiscountPercent } from "../../utils";

function ProductSwiperSkeleton() {
    return <Skeleton variant="rectangular" className="h-[281px] w-full" />;
}
function ProductSwiperCard(props: { product: any; className?: string }) {
    const navigate = useNavigate();
    const { product } = props;

    return (
        <Card className={props.className} elevation={2}>
            <CardActionArea
                onClick={() => navigate(`/product/details/${product.id}`)}
            >
                {product.max_discount_amount && (
                    <div className="bg-saleBadge w-20 h-8  z-10 bg-cover bg-center p-1 -left-1 absolute top-2">
                        <p className="font-semibold text-sm text-white my-0">
                            {"Giảm " +
                                getDiscountPercent(
                                    product.priceDiscount,
                                    product.price
                                )}
                            %
                        </p>
                    </div>
                )}
                <CardMedia
                    component="img"
                    image={product.image_url}
                    alt={product.name}
                    className="w-full  object-cover object-center"
                    loading="lazy"
                />
                <CardContent className="p-3 w-full">
                    <p className="text-xs font-medium  my-0 line-clamp-2 h-8 leading-4">
                        {product.name}
                    </p>
                    <Rating
                        name="simple-controlled"
                        defaultValue={product.rating}
                        className=" my-1 -mx-1"
                        size="small"
                        precision={0.5}
                        readOnly
                    />
                    <div className="flex flex-col mt-2">
                        {product.max_discount_amount ? (
                            <p className="text-sm font-normal text-gray-100 my-0 line-through">
                                {changePriceFormat(product.price)}đ
                            </p>
                        ) : (
                            <p className="text-sm font-normal text-gray-100 my-0">
                                <br />
                            </p>
                        )}
                        <p className="text-lg font-medium text-red_main my-0">
                            {changePriceFormat(product.priceDiscount)}đ
                        </p>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default function ProductDiscountSwiper(props: {
    header?: string;
    products: any;
}) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        setProducts(props.products);
    }, [props.products]);

    const [progress, setProgress] = useState(0);
    const swiperRef = useRef();
    const getProgress = (progress: number) => {
        setProgress(progress);
    };
    const handlePrev = useCallback(() => {
        if (!swiperRef.current) return;
        swiperRef.current?.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!swiperRef.current) return;
        swiperRef.current?.slideNext();
    }, []);

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
        <div className="w-full h-fit  relative px-6">
            <Swiper
                // install Swiper modules
                modules={[Navigation, A11y, Scrollbar]}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                    1586: { slidesPerView: 4 },
                }}
                scrollbar={{
                    draggable: true,
                    hide: true,
                }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => getProgress(swiper.progress)}
                cssMode={true}
                className="pb-4"
            >
                {products && products.length > 0
                    ? products.map((product: any) => (
                          <SwiperSlide
                              key={product.id}
                              className="py-6 overflow-visible  px-3"
                          >
                              <ProductSwiperCard
                                  product={product}
                                  className="h-auto transition ease-in-out delay-150  hover:-translate-y-2 hover:scale-105 overflow-visible"
                                  key={product.id}
                              />
                          </SwiperSlide>
                      ))
                    : getDummy().map((value, index) => (
                          <SwiperSlide key={index} className="py-8">
                              <ProductSwiperSkeleton />
                          </SwiperSlide>
                      ))}
            </Swiper>

            <div
                className={
                    progress === 1
                        ? "flex absolute top-[calc(50%-24px)] z-10 cursor-pointer -right-5 image-swiper-button-next opacity-50 pointer-events-none"
                        : "flex absolute top-[calc(50%-24px)] z-10 cursor-pointer -right-5 image-swiper-button-next "
                }
                onClick={handleNext}
            >
                <div className="h-12 w-12 bg-white flex items-center justify-center shadow rounded-[6rem]">
                    <IoIosArrowForward className="h-6 w-6" />
                </div>
            </div>
            <div
                className={
                    progress === 0
                        ? "flex absolute top-[calc(50%-24px)] z-10 cursor-pointer  -left-5 image-swiper-button-prev opacity-50 pointer-events-none"
                        : "flex absolute top-[calc(50%-24px)] z-10 cursor-pointer -left-5 image-swiper-button-next "
                }
                onClick={handlePrev}
            >
                <div className="h-12 w-12 bg-white flex items-center justify-center shadow rounded-[6rem]">
                    <IoIosArrowBack className="h-6 w-6" />
                </div>
            </div>
        </div>
    );
}
