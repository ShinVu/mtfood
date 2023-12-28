import { useEffect, useState } from "react";
import { useAppSelector } from "./reduxHook";
import {
    priceCart,
    priceWholesaleCart,
    product,
    productCart,
} from "../models/product.model";

//Return prices,... of cart
export default function usePriceWholesaleCheckout() {
    const [price, setPrice] = useState<priceWholesaleCart | null>(null);
    const { productWholesaleCart, totalNumOfProductWholesale } = useAppSelector(
        (state) => state.product
    );
    const getWholesalePrice = (product: productCart) => {
        const wholesalePrice = product.product_wholesale_pricing;

        if (wholesalePrice && wholesalePrice.length > 0) {
            for (
                let priceIndex = wholesalePrice.length - 1;
                priceIndex >= 0;
                priceIndex--
            ) {
                if (
                    totalNumOfProductWholesale >=
                    wholesalePrice[priceIndex].quantity_from
                ) {
                    return wholesalePrice[priceIndex].price;
                }
            }
        }
        return "";
    };
    useEffect(() => {
        function getPrice() {
            let totalPrice = 0;
            let totalSub = 0;
            let totalShippingFee = 21000;
            Object.entries(productWholesaleCart).forEach(
                ([key, product]: any) => {
                    if (product.check) {
                        totalSub =
                            totalSub +
                            parseFloat(getWholesalePrice(product)) *
                                parseFloat(product.quantityForProduct);
                    }
                }
            );

            totalPrice = totalSub + totalShippingFee;
            return {
                totalPrice,
                totalShippingFee,
                totalSub,
            };
        }
        const result: priceWholesaleCart = getPrice();
        setPrice(result);
    }, [productWholesaleCart]);

    return price;
}
