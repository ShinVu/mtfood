import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import { ProductCard } from "../features/product";
import useWindowSizeDimensions from "../hooks/useWindowResponsiveDimensions";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { colors } from "../../public/theme";
import { filter, product } from "../models/product.model";
import { getItemsPerPage } from "../utils";
import { SetURLSearchParams, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

function Items({ products }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 gap-4 w-full">
            {products.length > 0 ? (
                products.map((product) => (
                    <ProductCard
                        product={product}
                        className="w-full min-w-fit h-fit"
                        key={product.id}
                    />
                ))
            ) : (
                <></>
            )}
        </div>
    );
}

function PaginatedProducts({
    products,
    totalPage,
    searchParams,
    setSearchParams,
}: {
    products: Array<product>;
    totalPage: number;
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
}) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    // Invoke when user click to request another page.

    const pageNumber = searchParams.get("page")
        ? parseInt(searchParams.get("page"))
        : 1;

    const handlePageClick = (event: any) => {
        const pageNumber = event.selected + 1; //First page default to 1

        //Query string for page
        searchParams.set("page", pageNumber);
        setSearchParams(searchParams);
    };

    return (
        <>
            <Items products={products} />

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
                pageRangeDisplayed={3}
                marginPagesDisplayed={3}
                pageCount={totalPage}
                renderOnZeroPageCount={null}
                forcePage={pageNumber - 1}
                containerClassName="flex flex-row self-center mt-5 space-x-2 items-center"
                pageLinkClassName=" flex min-w-fit h-fit py-1 min-w-fit bg-white w-8 items-center justify-center border rounded text-black font-medium no-underline"
                activeLinkClassName="flex min-w-fit h-fit py-1 min-w-fit bg-primary_main w-12 items-center justify-center border rounded text-white font-medium no-underline"
                disabledLinkClassName="opacity-50"
            />
        </>
    );
}

export default function PaginationProducts({
    products,
    totalPage,
    isLoading,
    searchParams,
    setSearchParams,
}: {
    products: Array<product> | null;
    totalPage: number;
    isLoading: boolean;
    pageNumber: number;
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
}) {
    const { t } = useTranslation();
    if (products) {
        if (products.length > 0) {
            return (
                <PaginatedProducts
                    products={products}
                    totalPage={totalPage}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                />
            );
        } else {
            return <p>{t("noItems")}</p>;
        }
    } else {
        return (
            <div className="flex w-full items-center justify-center">
                <CircularProgress />
            </div>
        );
    }
}
