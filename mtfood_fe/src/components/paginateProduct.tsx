import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import { ProductCard } from "../features/product";
import useWindowSizeDimensions from "../hooks/useWindowResponsiveDimensions";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { colors } from "../../public/theme";

function getItemsPerPage() {
    const size = useWindowSizeDimensions();
    let itemsPerRow = 1;
    switch (size) {
        case "xs":
            itemsPerRow = 2;
            break;
        case "sm":
            itemsPerRow = 3;
            break;
        case "md":
            itemsPerRow = 3;
            break;
        case "lg":
            itemsPerRow = 4;
            break;
        case "xl":
            itemsPerRow = 6;
            break;
        default:
            itemsPerRow = 2;
            break;
    }
    return itemsPerRow * 4;
}
const products = [
    {
        id: 1,
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        id: 2,
        name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
    {
        name: "Khô bò",
        imgList: ["/assets/image_15.png"],
        numsOfRating: 10,
        rating: 4.6,
        stock: 200,
        id: 3,
        price: "500.000",
    },
];

function Items({ products }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 w-full">
            {products &&
                products.map((product) => (
                    <ProductCard
                        product={product}
                        className="w-full min-w-fit h-fit"
                    />
                ))}
        </div>
    );
}

export default function PaginatedProducts() {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = getItemsPerPage();
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    const productItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / itemsPerPage);
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items products={productItems} />

            <ReactPaginate
                breakLabel="..."
                nextLabel={
                    <KeyboardArrowRightIcon
                        sx={{ color: colors.primary_main, fontSize: 32 }}
                        className="my-0"
                    />
                }
                previousLabel={
                    <KeyboardArrowLeftIcon
                        sx={{ color: colors.primary_main, fontSize: 32 }}
                        className="my-0"
                    />
                }
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                marginPagesDisplayed={3}
                pageCount={pageCount}
                renderOnZeroPageCount={null}
                containerClassName="flex flex-row self-center mt-5 space-x-2 items-center"
                pageLinkClassName=" flex min-w-fit h-fit py-1 min-w-fit bg-white w-8 items-center justify-center border rounded text-black font-medium no-underline"
                activeLinkClassName="flex min-w-fit h-fit py-1 min-w-fit bg-primary_main w-12 items-center justify-center border rounded text-white font-medium no-underline"
                disabledLinkClassName="opacity-50"
            />
        </>
    );
}
