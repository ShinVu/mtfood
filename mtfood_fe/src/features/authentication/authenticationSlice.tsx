import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: 1234,
    // token: localStorage.getItem("ACCESS_TOKEN"),
    token: 123,
};
export const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        setUser(state, action) {
            const user = action.payload.user;
            state.user = user;
        },
        setToken(state, action) {
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

export default authenticationSlice.reducer;
