import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../features/authentication/authenticationSlice.ts";

//Include all Reducers of the application
const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
    },
});

export default store;
