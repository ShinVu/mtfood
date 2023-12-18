import { createSlice, current } from "@reduxjs/toolkit";

//Date time format
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { update } from "lodash";
import {
    orderType,
    orderVoucher,
    orderWholesaleType,
} from "../../models/order.model";
dayjs.extend(utc);

const getLocalStorage = (key: string) => {
    const value = localStorage.getItem(key);
    if (!value) {
        return null;
    } else {
        return JSON.parse(value);
    }
};

type initialStateType = {
    orders: Array<orderType> | null;
    wholesaleOrders: Array<orderWholesaleType> | null;
    selectedVoucher: orderVoucher | null;
    selectedPaymentMethod: "cod" | "momo" | "vnpay";
};
//initial state for authentication slice
const initialState: initialStateType = {
    orders: null,
    wholesaleOrders: null,
    selectedVoucher: null,
    selectedPaymentMethod: "cod",
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrder(state, action) {
            const orders = action.payload;
            state.orders = orders;
        },
        pushOrder(state, action) {
            const orders = action.payload;
            if (!state.orders) {
                state.orders = [];
            }
            state.orders.push(...orders);
        },

        setWholesaleOrder(state, action) {
            const wholesaleOrders = action.payload;
            state.wholesaleOrders = wholesaleOrders;
        },
        pushWholesaleOrder(state, action) {
            const wholesaleOrders = action.payload;
            if (!state.wholesaleOrders) {
                state.wholesaleOrders = [];
            }
            state.wholesaleOrders.push(...wholesaleOrders);
        },
        setVoucher(state, action) {
            const selectedVoucher = action.payload;
            if (selectedVoucher) {
                state.selectedVoucher = selectedVoucher;
            } else {
                state.selectedVoucher = null;
            }
        },

        setPaymentMethod(state, action) {
            const selectedPaymentMethod = action.payload;
            state.selectedPaymentMethod = selectedPaymentMethod;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setOrder,
    pushOrder,
    pushWholesaleOrder,
    setVoucher,
    setPaymentMethod,
    setWholesaleOrder,
} = orderSlice.actions;

// Export reducer to create store in app/store.tsx
export default orderSlice.reducer;
