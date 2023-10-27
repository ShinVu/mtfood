import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../features/authentication/authenticationSlice.ts";
import productReducer from "../features/product/productSlice.ts";
//Include all Reducers of the application
export const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        product: productReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
