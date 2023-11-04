import useWindowSizeDimensions from "../hooks/useWindowResponsiveDimensions";

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
            return "md";
        case "xl":
            return "md";
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

export {
    matchIsNumeric,
    getSizeDialog,
    changePriceFormat,
    isInt,
    getSubTotal,
    getItemsPerPage,
};
