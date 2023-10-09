//Check if text is numeric
function matchIsNumeric(text) {
    const isNumber = typeof text === "number";
    return isNumber && !isNaN(Number(text));
}

export {matchIsNumeric};