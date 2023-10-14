import React, { useState } from "react";
import { ProductCard } from "../../features/product";
// import Swiper core and required modules
import {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Virtual,
} from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
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

function ProductSwiperCard(props) {
    const { product } = props;
    return (
        <Card className={props.className}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image="/assets/image_14.png"
                    alt="green iguana"
                    className="w-full h-36 object-cover object-center"
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
                    <p className="text-base font-medium text-red_main my-0">
                        đ{product.price}
                    </p>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default function ProductSwiper(props) {
    const { header, products } = props;
    return (
        <div className="w-full h-fit  relative px-4">
            <div className="flex absolute top-[calc(50%-24px)] z-10 cursor-pointer -right-0 image-swiper-button-next">
                <div className="h-12 w-12 bg-white flex items-center justify-center shadow rounded-[6rem]">
                    <IoIosArrowForward className="h-6 w-6" />
                </div>
            </div>
            <div className="flex absolute top-[calc(50%-24px)] z-10 cursor-pointer  -left-0 image-swiper-button-prev">
                <div className="h-12 w-12 bg-white flex items-center justify-center shadow rounded-[6rem]">
                    <IoIosArrowBack className="h-6 w-6" />
                </div>
            </div>

            <Swiper
                // install Swiper modules
                modules={[Navigation, A11y, Scrollbar, Virtual]}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 5 },
                    1280: { slidesPerView: 6 },
                }}
                spaceBetween={15}
                navigation={{
                    nextEl: ".image-swiper-button-next",
                    prevEl: ".image-swiper-button-prev",
                    disabledClass: "swiper-button-disabled",
                }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
                cssMode={true}
                className="pb-3 "
            >
                {products &&
                    products.map((product) => (
                        <SwiperSlide key={product.id} className="py-1">
                            <ProductSwiperCard
                                product={product}
                                className="h-fit"
                            />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
}
