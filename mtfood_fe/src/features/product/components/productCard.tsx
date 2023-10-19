import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import { CardActionArea } from "@mui/material";
export default function ProductCard(props: {
    product: any;
    className?: string;
}) {
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
