import { createSlice, current } from "@reduxjs/toolkit";

//Date time format
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { product, productCart } from "../../models/product.model";
dayjs.extend(utc);

const getLocalStorage = (key: string) => {
    const value = localStorage.getItem(key);
    if (!value) {
        return null;
    } else {
        return JSON.parse(value);
    }
};
//initial state for authentication slice
const initialState = {
    productCategory: null,
    productTag: null,
    productNew: null,
    productMostLiked: null,
    productDiscount: null,
    productCart: getLocalStorage("CART"),
    cartChecked: getLocalStorage("CART_CHECKED"),
};
export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProductCategory(state, action) {
            //set product Category based on action payload
            const category = action.payload;
            state.productCategory = category;
        },
        setProductTag(state, action) {
            //set product Tag based on action payload
            const tag = action.payload;
            state.productTag = tag;
        },
        setProductNew(state, action) {
            //set product new based on action payload
            const productNew = action.payload;
            state.productNew = productNew;
        },
        setProductMostLiked(state, action) {
            //set product Tag based on action payload
            const productMostLiked = action.payload;
            state.productMostLiked = productMostLiked;
        },
        setProductDiscount(state, action) {
            //set product Tag based on action payload
            const productDiscount = action.payload;
            state.productDiscount = productDiscount;
        },
        addProductToCart(state, action) {
            //set  Cart based on action payload
            const product: productCart = action.payload;
            const newProductCart = {
                ...state.productCart,
                [product.id]: { ...product },
            };
            state.productCart = newProductCart;

            localStorage.setItem("CART", JSON.stringify(newProductCart));
        },
        removeProductFromCart(state, action) {
            let removeProductId = action.payload;
            const { [removeProductId]: omit, ...newProductCart } =
                state.productCart;
            state.productCart = newProductCart;

            localStorage.setItem("CART", JSON.stringify(newProductCart));
        },
        removeAllProductFromCart(state) {
            state.productCart = {};
            localStorage.setItem("CART", JSON.stringify({}));
        },

        setAllProductCheckedCart(state) {
            const currentCheck = state.cartChecked;
            Object.entries(state.productCart).forEach(([key, product]: any) => {
                product.check = !currentCheck;
            });
            state.cartChecked = !currentCheck;
            localStorage.setItem("CART", JSON.stringify(state.productCart));
            localStorage.setItem(
                "CART_CHECKED",
                JSON.stringify(state.cartChecked)
            );
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setProductCategory,
    setProductTag,
    setProductNew,
    setProductMostLiked,
    setProductDiscount,
    addProductToCart,
    removeProductFromCart,
    setAllProductCheckedCart,
    removeAllProductFromCart,
} = productSlice.actions;

// Export reducer to create store in app/store.tsx
export default productSlice.reducer;
