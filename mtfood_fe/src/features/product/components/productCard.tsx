import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { changePriceFormat } from "../../../utils";
export default function ProductCard(props: {
    product: any;
    className?: string;
}) {
    const { product } = props;
    const navigate = useNavigate();
    return (
        <Card className={props.className}>
            <CardActionArea
                onClick={() => navigate(`/product/details/${product.id}`)}
            >
                <CardMedia
                    component="img"
                    image={product.image_url}
                    alt="green iguana"
                    className="w-full h-44 object-cover object-center"
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
