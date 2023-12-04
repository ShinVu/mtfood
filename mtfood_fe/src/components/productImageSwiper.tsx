import React, { useCallback, useRef, useState } from "react";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function ProductImageSwiper({ images }: { images: any }) {
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
    if (images) {
        return (
            <div className="w-full h-fit  relative px-6">
                <Swiper
                    // install Swiper modules
                    modules={[Navigation, A11y, Scrollbar]}
                    slidesPerView={2}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) => getProgress(swiper.progress)}
                    className="pb-4"
                    spaceBetween={5}
                >
                    {images.map((image: any) => (
                        <SwiperSlide key={image.id}>
                            <img
                                src={image.image_url}
                                className=" w-full aspect-square object-cover object-center"
                                alt="img"
                                loading="lazy"
                            />
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
                    <div className="h-12 w-12  flex items-center justify-center ">
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
                    <div className="h-12 w-12  flex items-center justify-center  ">
                        <IoIosArrowBack className="h-6 w-6" />
                    </div>
                </div>
            </div>
        );
    }
}
