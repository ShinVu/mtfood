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
export default function ImageSwiper() {
    return (
        <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectCreative]}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            autoplay={{
                delay: 5000,
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
                <img
                    src="/assets/image_14.png"
                    className="w-full h-full object-cover object-center"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="/assets/image_15.png"
                    className="w-full h-full object-cover object-center"
                />
            </SwiperSlide>
        </Swiper>
    );
}
