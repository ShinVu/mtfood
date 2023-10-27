import { createSlice } from "@reduxjs/toolkit";

//Date time format
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
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
    },
});

// Action creators are generated for each case reducer function
export const {
    setProductCategory,
    setProductTag,
    setProductNew,
    setProductMostLiked,
    setProductDiscount,
} = productSlice.actions;

// Export reducer to create store in app/store.tsx
export default productSlice.reducer;
