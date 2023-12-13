import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { changePriceFormat, getDiscountPercent } from "../../../utils";
import { useTranslation } from "react-i18next";
export default function ProductWholesaleCard(props: {
    product: any;
    className?: string;
}) {
    const { t } = useTranslation();
    const { product } = props;
    const navigate = useNavigate();
    return (
        <Card className={props.className}>
            <CardActionArea
                onClick={() =>
                    navigate(`/productWholesale/details/${product.id}`)
                }
            >
                {product.max_discount_amount && (
                    <div className="bg-saleBadge w-20 h-8  z-10 bg-cover bg-center p-1  absolute top-2">
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
                    className="w-full aspect-square object-cover object-center"
                    loading="lazy"
                />
                <CardContent className="p-3 w-full">
                    <p className="text-base font-semibold  my-1 line-clamp-2 h-8 leading-4">
                        {product.name}
                    </p>
                    <Rating
                        name="simple-controlled"
                        defaultValue={product.rating}
                        className=" my-2 -mx-1"
                        size="small"
                        precision={0.5}
                        readOnly
                    />
                    <div className="flex flex-col mt-2">
                        {/* {product.max_discount_amount ? (
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
                        </p> */}
                        {product.product_wholesale_pricing
                            .slice(0, 2)
                            .map((wholesale_price: any) => (
                                <div
                                    className="flex flex-row justify-between"
                                    key={wholesale_price.id}
                                >
                                    <p className="text-base font-medium  my-0">
                                        {t("from") + " "}
                                        {wholesale_price.quantity_from}
                                        {wholesale_price.quantity_to &&
                                            " " +
                                                t("to") +
                                                " " +
                                                wholesale_price.quantity_to +
                                                " "}
                                        {t("product") + ":"}
                                    </p>
                                    <p className="text-lg font-semibold text-red_main my-0">
                                        {changePriceFormat(
                                            wholesale_price.price
                                        )}
                                        đ
                                    </p>
                                </div>
                            ))}
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
