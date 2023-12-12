import React, { useState } from "react";
import { ProductCard } from "../features/product";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
export default function ImageSwiper() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectCreative]}
            slidesPerView={1}
            autoplay={{
                delay: 2500,
            }}
            className="w-full h-full"
            effect={"creative"}
            creativeEffect={{
                prev: {
                    shadow: true,
                    translate: ["-20%", 0, -1],
                },
                next: {
                    translate: ["100%", 0, 0],
                },
            }}
            cssMode={true}
        >
            <SwiperSlide>
                <div className="relative w-full h-full bg-blue">
                    <div className=" absolute w-full h-full top-0 left-0 object-cover  bg-blue">
                        <img
                            src="/assets/poster_2.jpg"
                            className="w-full h-full object-cover object-center"
                            alt="poster"
                        />
                    </div>
                    <div className="absolute bottom-40 left-20">
                        <h1 className="text-[98px] leading-[88px] m-0  text-white font-bold">
                            MTFOOD
                        </h1>
                        <p className="text-lg text-white font-bold m-0">
                            {t("introduction")}
                        </p>
                        <Button
                            className="bg-orange-web text-white hover:bg-rich-black mt-6"
                            onClick={() => navigate("/product")}
                        >
                            {t("product")}
                        </Button>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="relative w-full h-full bg-blue">
                    <div className=" absolute w-full h-full top-0 left-0 object-cover object-center  ">
                        <img
                            src="/assets/poster.jpg"
                            className="w-full h-full object-cover object-center "
                            alt="poster"
                        />
                    </div>
                    <div className="absolute bottom-40 left-20">
                        <h1 className="text-[98px] leading-[88px] m-0  text-white font-bold">
                            MTFOOD
                        </h1>
                        <p className="text-lg text-white font-bold m-0">
                            {t("introduction")}
                        </p>
                        <Button
                            className="bg-orange-web text-white hover:bg-rich-black mt-6"
                            onClick={() => navigate("/product")}
                        >
                            {t("product")}
                        </Button>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
}
