import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Footer } from "../components/footer";
import Header from "../components/header";
import { useParams } from "react-router-dom";

import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { colors } from "../../public/theme";
import { TbTruckDelivery } from "react-icons/tb";
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { TextField } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
export default function ProductDetails() {
    const { t } = useTranslation();
    const { id } = useParams();
    const [value, setValue] = React.useState<number | null>(2);
    return (
        <div className="flex flex-1 flex-col">
            <Header />
            <div className="flex flex-1 p-4 flex-col bg-background_main space-y-4">
                <p className="text-xs font-bold">{t("home")} {">"} {t("product")} {">"}</p>
                <div className="flex p-4 flex-row bg-white">
                    <div className="flex mr-10">
                        <img src="/assets/image_15.png" className="w-44 h-44 xl:w-64 xl:h-64 object-cover object-center" />
                    </div>
                    <div className="flex flex-1 flex-col">
                        <h1 className="text-base font-bold uppercase">Khô bò</h1>
                        <div className="flex flex-row items-center">
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                className="-mx-1 my-0"
                                size="small"
                            />
                            <div className="flex flex-row items-center mx-4">
                                <div className="mx-2">
                                    <p className="text-xs font-semibold text-gray-200 my-0">10 đánh giá</p>
                                </div>
                                <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 2, bgcolor: colors.gray[100] }} />
                                <div className="mx-1">
                                    <Button component="label" variant="text" sx={{ textTransform: "none" }} startIcon={<FavoriteBorderIcon sx={{ color: colors.primary_main }} />}>
                                        <span className="text-xs font-semibold text-gray-100 my-0">Yêu thích</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-red_main">đ500.000</h1>
                            <p className="text-xs font-medium text-gray-100 line-through">đ200.000</p>
                        </div>
                        <Divider sx={{ borderBottomWidth: 1, bgcolor: colors.gray[100] }} />
                        <div className="my-5 flex flex-1 flex-col space-y-10">
                            <div className="flex flex-row items-center">
                                <div className="">
                                    <p className="text-xs font-medium text-gray-100 my-0 mr-5">Vận chuyển</p>
                                </div>
                                <div className="mr-5">
                                    <TbTruckDelivery size={28} />
                                </div>
                                <div className="flex flex-col space-y-4">
                                    <div className="flex flex-row items-center">
                                        <p className="text-xs font-medium text-gray-100 my-0  mr-5">Vận chuyển tới</p>
                                    </div>
                                    <div className="">
                                        <p className="text-xs font-medium text-gray-100 my-0 mr-5">Phí vận chuyển</p>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-4">
                                    <div className="">
                                        <p className="text-xs font-bold my-0  mr-5">Bạch Đằng, Quận Tân Bình, TP.HCM</p>
                                    </div>

                                    <div className="">
                                        <p className="text-xs font-bold my-0  mr-5">50.000đ</p>
                                    </div>
                                </div>
                                <div className="flex self-start">
                                    <Button component="label" variant="text" sx={{ textTransform: "none" }} className="p-0"  >
                                        <span className="text-xs font-semibold text-primary_main my-0">Thay đổi</span>
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-row items-center">
                                <div className="">
                                    <p className="text-xs font-medium text-gray-100 my-0 mr-5">Số lượng</p>
                                </div>
                                <div className="flex flex-row items-center border">
                                    <IconButton aria-label="delete" className="rounded-none">
                                        <RemoveIcon className="rounded-none" />
                                    </IconButton>
                                    <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 1, bgcolor: colors.gray[100] }} />
                                    <TextField variant="outlined" size="small" inputProps={{ min: 0, style: { textAlign: 'center' } }} sx={{ width: "8ch", "& fieldset": { border: "none" } }} />
                                    <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 1, bgcolor: colors.gray[100] }} />
                                    <IconButton aria-label="delete">
                                        <AddIcon />
                                    </IconButton>
                                </div>
                                <div className="">
                                    <p className="text-xs font-medium text-gray-100 my-0 ml-5">200 Sản phẩm có sẵn</p>
                                </div>

                            </div>
                            <div className="flex flex-row space-x-4">
                                <Button variant="contained" className="min-w-fit" startIcon={<AddShoppingCartIcon />}>Thêm vào giỏ hàng</Button>
                                <Button variant="contained" className="min-w-fit">Mua ngay</Button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="flex p-4 flex-col bg-white">
                    <h1 className="text-base font-bold uppercase">Thông tin sản phẩm</h1>
                    <div className="mt-4">
                        <p className="font-regular text-sx text-gray-100">Danh mục: <span className="font-medium text-sx text-black">Việt Nam</span></p>
                        <p className="font-regular text-sx text-gray-100">Danh mục: <span className="font-medium text-sx text-black">Việt Nam</span></p>
                        <p className="font-regular text-sx text-gray-100">Danh mục: <span className="font-medium text-sx text-black">Việt Nam</span></p>
                        <p className="font-regular text-sx text-gray-100">Danh mục: <span className="font-medium text-sx text-black">Việt Nam</span></p>
                        <p className="font-regular text-sx text-gray-100">Danh mục: <span className="font-medium text-sx text-black">Việt Nam</span></p>
                        <p className="font-regular text-sx text-gray-100">Danh mục: <span className="font-medium text-sx text-black">Việt Nam</span></p>
                        <p className="font-regular text-sx text-gray-100">Danh mục: <span className="font-medium text-sx text-black">Việt Nam</span></p>
                        <p className="font-regular text-sx text-gray-100">Danh mục: <span className="font-medium text-sx text-black">Việt Nam</span></p>
                        
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}