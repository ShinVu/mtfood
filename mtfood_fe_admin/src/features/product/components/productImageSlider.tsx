import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

export default function ProductImageSlider(props: any) {
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
        },
    ];

    return (
        <Carousel className="flex flex-1 flex-col w-24 h-24">
            {items.map((item, i) => (
                <Item key={i} item={item} />
            ))}
        </Carousel>
    );
}

function Item(props: any) {
    return <img src="/assets/image_14.png" className="w-full h-full" />;
}
