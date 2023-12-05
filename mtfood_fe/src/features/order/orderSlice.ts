import { createSlice, current } from "@reduxjs/toolkit";

//Date time format
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { update } from "lodash";
import { orderType, orderVoucher } from "../../models/order.model";
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
    selectedVoucher: orderVoucher | null;
};
//initial state for authentication slice
const initialState: initialStateType = {
    orders: null,
    selectedVoucher: null,
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
        setVoucher(state, action) {
            const selectedVoucher = action.payload;
            if (selectedVoucher) {
                state.selectedVoucher = selectedVoucher;
            } else {
                state.selectedVoucher = null;
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { setOrder, pushOrder, setVoucher } = orderSlice.actions;

// Export reducer to create store in app/store.tsx
export default orderSlice.reducer;
