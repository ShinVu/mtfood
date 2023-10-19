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

export { matchIsNumeric, getSizeDialog };
