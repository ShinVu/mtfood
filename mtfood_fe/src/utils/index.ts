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
function changePriceFormat(value: string | null) {
    if (!value) {
        return "";
    }
    const money = Number(value);
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

export { matchIsNumeric, getSizeDialog, changePriceFormat };
