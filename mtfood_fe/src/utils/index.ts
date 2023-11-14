import useWindowSizeDimensions from "../hooks/useWindowResponsiveDimensions";
import { orderType } from "../models/order.model";

//Check if text is numeric
function matchIsNumeric(text) {
    const isNumber = typeof text === "number";
    return isNumber && !isNaN(Number(text));
}

//Get size for dialog
function getSizeDialog(size: string) {
    switch (size) {
        case "sm":
            return "sm";
        case "xs":
            return "xs";
        case "md":
            return "md";
        case "lg":
            return "lg";
        case "xl":
            return "lg";
        case "2xl":
            return "lg";
    }
}

//Return price in VND format
function changePriceFormat(value: string | number | null) {
    if (!value) {
        return "";
    }
    const money = value;
    const config = {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 3,
    };
    const formated = new Intl.NumberFormat("vi-VN", config)
        .format(money)
        .split(" ")[0];
    return formated;
}

//Check int number
function isInt(value: string) {
    return (
        !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10))
    );
}

//Get SubTotal value
function getSubTotal(price: string, quantity: number = 1) {
    if (!price) {
        return "";
    }
    const money = Number(price);
    const subTotal = money * quantity;
    return String(subTotal);
}

//Get items per page for pagination
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
        case "2xl":
            itemsPerRow = 6;
            break;
        default:
            itemsPerRow = 2;
            break;
    }
    return itemsPerRow * 4;
}

function changeTimeFormat(value: string) {
    var a = new Date(value).toString().split(/\s/);
    return (
        a[2] +
        "/" +
        {
            Jan: "01",
            Feb: "02",
            Mar: "03",
            Apr: "04",
            May: "05",
            Jun: "06",
            Jul: "07",
            Aug: "08",
            Sep: "09",
            Oct: "10",
            Nov: "11",
            Dec: "12",
        }[a[1]] +
        "/" +
        a[3] +
        " " +
        a[4]
    );
}

function getOrderItemSubTotal(price: string, quantity: number) {
    return String(parseFloat(price) * quantity);
}

function getOrderTotal(order: orderType) {
    const total = String(
        parseFloat(order.subtotal) +
            parseFloat("5") -
            parseFloat(order.shipping_discount) -
            parseFloat(order.voucher_discount)
    );
    return total;
}

function getOrderBillingValue(order: orderType) {
    const billing = {
        subTotal: order.subtotal,
        shippingFee: "5",
        shippingDiscount: order.shipping_discount,
        voucherDiscount: order.voucher_discount,
        total: getOrderTotal(order),
    };
    return billing;
}
export {
    matchIsNumeric,
    getSizeDialog,
    changePriceFormat,
    isInt,
    getSubTotal,
    getItemsPerPage,
    changeTimeFormat,
    getOrderItemSubTotal,
    getOrderBillingValue,
};
