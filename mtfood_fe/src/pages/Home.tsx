import React, { useState } from "react";
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
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const categories = [
    { id: 1, name: "Đồ ăn chiên, sấy" },
    { id: 2, name: "Các loại đậu, hạt" },
    { id: 3, name: "Bánh tráng" },
    { id: 4, name: "Các loại kẹo" },
    { id: 5, name: "Các loại bánh" },
    { id: 6, name: "Các loại mức sấy dẻo" },
    { id: 7, name: "Các loại hạt dinh dưỡng" },
    { id: 8, name: "Trái cây sấy các loại" },
    { id: 9, name: "Đồ khô" },
];

const tags = [
    { id: 1, name: "Món ăn mới" },
    { id: 2, name: "Đang khuyến mãi" },
    { id: 3, name: "Món ăn yêu thích" },
    { id: 4, name: "Món ăn chay" },
];

const products = [
    {
        id: 1,
        name: "Khô bò",
        basePrice: "đ1.000.000",
        quantity: "12",
        price: "đ500.000",
    },
    {
        id: 2,
        name: "Khô bò",
        basePrice: "đ1.000.000",
        quantity: "12",
        price: "đ500.000",
    },
    {
        id: 3,
        name: "Khô bò",
        basePrice: "đ1.000.000",
        quantity: "12",
        price: "đ500.000",
    },
    {
        id: 4,
        name: "Khô bò",
        basePrice: "đ1.000.000",
        quantity: "12",
        price: "đ500.000",
    },
    {
        id: 5,
        name: "Khô bò",
        basePrice: "đ1.000.000",
        quantity: "12",
        price: "đ500.000",
    },
    {
        id: 6,
        name: "Khô bò",
        basePrice: "đ1.000.000",
        quantity: "12",
        price: "đ500.000",
    },
    {
        id: 7,
        name: "Khô bò",
        basePrice: "đ1.000.000",
        quantity: "12",
        price: "đ500.000",
    },
    {
        id: 8,
        name: "Khô bò",
        basePrice: "đ1.000.000",
        quantity: "12",
        price: "đ500.000",
    },
];

function CategoryCardItem(props) {
    const { category } = props;
    const navigate = useNavigate();
    return (
        <div
            className="flex flex-col items-center cursor-pointer min-w-fit align-center"
            onClick={() => navigate(`/product/cat/${category.id}`)}
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
    return (
        <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => navigate(`/product/tag/${tag.id}`)}
        >
            <p className="text-sm mt-2 text-black font-medium">{tag.name}</p>
        </div>
    );
}
function CategoryCard() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col flex-1 bg-white p-4 shadow">
            <h5 className="font-medium my-0 text-base text-gray-100">
                {t("category")}
            </h5>
            <div className="grid grid-cols-12 gap-4 mt-4">
                {categories.map((category) => (
                    <CategoryCardItem category={category} />
                ))}
            </div>
        </div>
    );
}

function TagCard() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col flex-1 bg-white p-4 shadow">
            <h5 className="font-medium my-0 text-base text-gray-100">
                {t("tag")}
            </h5>
            <div className="grid grid-cols-12 gap-4 mt-4">
                {tags.map((tag) => (
                    <TagCardItem tag={tag} />
                ))}
            </div>
        </div>
    );
}

function ProductSlideCard(props) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { header, tag } = props;
    return (
        <div className="flex flex-col flex-1  p-4 h-fit">
            <Divider
                className="mx-10 my-4 cursor-pointer"
                onClick={() => navigate(`/product/tag/${tag}`)}
            >
                <h4 className="text-2xl my-0 text-primary_main">{header}</h4>
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
                <ProductSlideCard header="Món ăn mới" type="newDish" tag={0} />
                <ProductSlideCard
                    header="Món yêu thích"
                    type="newDish"
                    tag={1}
                />
                <ProductSlideCard
                    header="Món khuyến mãi"
                    type="newDish"
                    tag={2}
                />
            </div>
            <Footer />
        </div>
    );
}
