import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../features/authentication/authenticationSlice.ts";
import productReducer from "../features/product/productSlice.ts";
import orderReducer from "../features/order/orderSlice.ts";
import chatReducer from "../features/chat/chatSlice.ts";
//Include all Reducers of the application
export const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        product: productReducer,
        order: orderReducer,
        chat: chatReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
