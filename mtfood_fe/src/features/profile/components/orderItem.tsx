import { Divider } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
//Import MUI
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
//Import Components
import {
    ContainedButton,
    OutlinedButton,
    TextButton,
} from "../../../components/button";
import { useNavigate } from "react-router-dom";
function OrderProductItem(props) {
    const { product } = props;
    return (
        <div className="flex flex-row items-start flex-1 justify-between">
            <div className="flex flex-row space-x-4">
                <img
                    src="/assets/image_14.png"
                    className="w-24 h-24 object-cover object-center"
                />
                <p className="font-medium font-sm my-0">{product.name}</p>
            </div>
            <div className="flex flex-row space-x-4">
                {product.basePrice && (
                    <p className="text-sm text-gray-100 line-through my-0">
                        {product.basePrice}
                    </p>
                )}
                <p className="text-sm font-medium text-red_main my-0">
                    {product.price}
                </p>
            </div>
        </div>
    );
}
export default function OrderItem(props) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { order } = props;
    return (
        <div className="flex flex-1 flex-col p-4 bg-white">
            <h5 className="text-primary_main font-base text-medium">
                {order.status}
            </h5>
            <Divider className="my-2" />
            <div className="flex flex-1">
                {order.products.map((product) => (
                    <OrderProductItem product={product} />
                ))}
            </div>
            <Divider className="my-2" />
            <div className="flex flex-1 justify-end space-x-4">
                <p className="text-gray-100 text-md my-0">
                    {t("totalOrderAmount")}
                </p>
                <p className="text-md font-medium text-red_main my-0">
                    {order.totalAmount}
                </p>
            </div>
            <div className="flex flex-1 flex-row justify-between mt-12 items-center">
                <p className="text-gray-100 text-xs my-0">
                    Thanh toan bang .....
                </p>
                <div className="flex flex-col lg:flex-row space-y-4 space-x-0 lg:space-y-0  lg:space-x-4">
                    <OutlinedButton
                        onClick={() => navigate("/user/order/details/0")}
                    >
                        {t("seeOrderDetail")}
                    </OutlinedButton>
                    <OutlinedButton endIcon={<KeyboardArrowDownIcon />}>
                        {t("seeMore")}
                    </OutlinedButton>
                </div>
            </div>
        </div>
    );
}
