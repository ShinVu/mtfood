import { useEffect, useState } from "react";
import { useAppSelector } from "./reduxHook";
import { priceCart, product, productCart } from "../models/product.model";

//Return prices,... of cart
export default function usePriceCheckout() {
    const [price, setPrice] = useState<priceCart | null>(null);
    const { productCart } = useAppSelector((state) => state.product);
    const { selectedVoucher } = useAppSelector((state) => state.order);
    useEffect(() => {
        function getPrice() {
            let totalPrice = 0;
            let totalProductDiscount = 0;
            let totalShippingFee = 21000;
            let totalVoucher = 0;
            let totalSub = 0;
            let totalDiscount = 0;

            Object.entries(productCart).forEach(([key, product]: any) => {
                if (product.check) {
                    totalSub =
                        totalSub +
                        parseFloat(product.price) *
                            parseFloat(product.quantityForProduct);
                    totalPrice =
                        totalPrice +
                        parseFloat(product.priceDiscount) *
                            parseFloat(product.quantityForProduct);
                    if (product.max_discount_amount) {
                        totalProductDiscount =
                            totalProductDiscount +
                            parseFloat(product.max_discount_amount) *
                                parseFloat(product.quantityForProduct);
                    }
                    totalVoucher = selectedVoucher
                        ? parseFloat(selectedVoucher.total_discount)
                        : 0;
                }
            });

            totalDiscount = totalProductDiscount + totalVoucher;
            totalPrice = totalPrice + totalShippingFee - totalVoucher;
            return {
                totalPrice,
                totalProductDiscount,
                totalShippingFee,
                totalSub,
                totalVoucher,
                totalDiscount,
            };
        }
        const result: priceCart = getPrice();
        setPrice(result);
    }, [productCart, selectedVoucher]);

    return price;
}
