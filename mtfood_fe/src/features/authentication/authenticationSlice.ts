import { createSlice } from "@reduxjs/toolkit";

//initial state for authentication slice
const initialState = {
    user: null,
    // token: localStorage.getItem("ACCESS_TOKEN"),
    token: null,
};
export const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        setUser(state, action) {
            //set user based on action payload
            const user = action.payload.user;
            state.user = user;
        },
        setToken(state, action) {
            //set token based on action payload
            const token = action.payload.token;
            state.token = token;
            if (token) {
                localStorage.setItem("ACCESS_TOKEN", token);
            } else {
                localStorage.removeItem("ACCESS_TOKEN");
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser, setToken } = authenticationSlice.actions;

// Export reducer to create store in app/store.tsx
export default authenticationSlice.reducer;
