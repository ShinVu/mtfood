import React, { useState } from "react";
import { useTranslation } from "react-i18next";
//Import MUI
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
//Import components
import Header from "../components/header";
import Footer from "../components/Footer";
import {
    ContainedButton,
    OutlinedButton,
    TextButton,
} from "../components/button.jsx";
import ImageSwiper from "../components/imageSwiper.js";
import ProductSwiper from "../components/productSwiper/productSwiper.js";
import { Divider } from "@mui/material";

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

const products = [
    {
        id: 1,
        name: "Khô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bò",
        basePrice: "đ1.000.000",
        quantity: "12",
        price: "đ500.000",
    },
    {
        id: 2,
        name: "Khô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bò",
        basePrice: "đ1.000.000",
        quantity: "12",
        price: "đ500.000",
    },
    {
        id: 3,
        name: "Khô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bò",
        basePrice: "đ1.000.000",
        quantity: "12",
        price: "đ500.000",
    },
    {
        id: 4,
        name: "Khô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bò",
        basePrice: "đ1.000.000",
        quantity: "12",
        price: "đ500.000",
    },
    {
        id: 5,
        name: "Khô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bò",
        basePrice: "đ1.000.000",
        quantity: "12",
        price: "đ500.000",
    },
    {
        id: 6,
        name: "Khô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bò",
        basePrice: "đ1.000.000",
        quantity: "12",
        price: "đ500.000",
    },
    {
        id: 7,
        name: "Khô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bò",
        basePrice: "đ1.000.000",
        quantity: "12",
        price: "đ500.000",
    },
    {
        id: 8,
        name: "Khô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bòKhô bò",
        basePrice: "đ1.000.000",
        quantity: "12",
        price: "đ500.000",
    },
];

function CategoryCardItem(props) {
    const { category } = props;
    return (
        <div className="flex flex-col items-center">
            <img
                src="/assets/image_14.png"
                className="w-12 h-12 rounded-[6rem]"
            />
            <p className="text-sm mt-2 font-medium">{category.name}</p>
        </div>
    );
}

function TagCardItem(props) {
    const { tag } = props;
    return (
        <div className="flex flex-col items-center">
            <p className="text-sm mt-2">{tag.name}</p>
        </div>
    );
}
function CategoryCard() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col flex-1 bg-white p-4">
            <h5 className="font-medium my-0 text-base">{t("category")}</h5>
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
        <div className="flex flex-col flex-1 bg-white p-4">
            <h5 className="font-medium my-0 text-base">{t("tag")}</h5>
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
    const { header, newType } = props;
    return (
        <div className="flex flex-col flex-1 bg-white p-4 h-fit">
            <div className="flex flex-row flex-1 justify-between items-center">
                <h5 className="font-medium my-0 text-base">{header}</h5>
                <TextButton endIcon={<KeyboardArrowRightIcon />}>
                    {t("more")}
                </TextButton>
            </div>
            <Divider className="mb-3 mt-0" />
            <div className="flex w-full h-fit max-w-full">
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
                <div className="w-full h-[36rem]   max-w-full">
                    <ImageSwiper />
                </div>
                <ProductSlideCard header="Món ăn mới" type="newDish" />
                <ProductSlideCard header="Món yêu thích" type="newDish" />
                <ProductSlideCard header="Món khuyến mãi" type="newDish" />
            </div>
            <Footer />
        </div>
    );
}
