import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../features/authentication/authenticationSlice.tsx";

const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
    },
});

export default store;
