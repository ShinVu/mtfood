import { createSlice } from "@reduxjs/toolkit";

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
    user: getLocalStorage("USER"),
    token: getLocalStorage("ACCESS_TOKEN"),
    signup: getLocalStorage("SIGNUP"),
};
export const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        setUser(state, action) {
            //set user based on action payload
            const user = action.payload;
            state.user = user;
            //Save log in information into storage
            localStorage.setItem("USER", JSON.stringify(user));
        },
        setToken(state, action) {
            //set token based on action payload
            const token = action.payload;
            state.token = token;
            //Save log in information into storage
            localStorage.setItem("ACCESS_TOKEN", JSON.stringify(token));
        },
        setSignup(state, action) {
            const signup = action.payload;
            state.signup = signup;
            localStorage.setItem("SIGNUP", JSON.stringify(signup));
        },
        clearSignup(state, action) {
            const signup = { id: null, email: null };
            state.signup = signup;
            localStorage.removeItem("SIGNUP");
        },
        signOut(state, action) {
            state.user = null;
            state.token = null;
            //Delete user from local storage
            localStorage.removeItem("USER");
            localStorage.removeItem("ACCESS_TOKEN");
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser, setToken, setSignup, clearSignup, signOut } =
    authenticationSlice.actions;

// Export reducer to create store in app/store.tsx
export default authenticationSlice.reducer;
