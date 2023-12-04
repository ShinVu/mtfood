import { createSlice } from "@reduxjs/toolkit";

//Date time format
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { botUttererMessage, userUtteredMessage } from "../../models/chat.model";
dayjs.extend(utc);

const getLocalStorage = (key: string) => {
    const value = localStorage.getItem(key);
    if (!value) {
        return null;
    } else {
        return JSON.parse(value);
    }
};
//initial state for chat slice
type initialState = {
    messages: Array<userUtteredMessage | botUttererMessage>;
    fullscreen: boolean;
    searchKeyword: { keyword: string; type: string } | null;
    loading: boolean;
    searchLoading: boolean;
};

const initialState: initialState = {
    messages: getLocalStorage("aiChat") ?? [],
    fullscreen: false,
    searchKeyword: null,
    loading: false,
    searchLoading: false,
};

export const chatSlice = createSlice({
    name: "aichat",
    initialState,
    reducers: {
        setUserUtteredMessage(state, action) {
            const newMessage: userUtteredMessage = action.payload;
            state.messages.push(newMessage);
        },
        setBotUtteredMessage(state, action) {
            const newMessage: botUttererMessage = action.payload;
            state.messages.push(newMessage);
            localStorage.setItem("aiChat", JSON.stringify(state.messages));
        },
        setFullscreen(state) {
            state.fullscreen = true;
        },
        deleteFullscreen(state) {
            state.fullscreen = false;
        },
        setKeyword(state, action) {
            const searchKeyword = action.payload;
            state.searchKeyword = searchKeyword;
        },
        deleteKeyword(state) {
            state.searchKeyword = null;
        },
        setLoadingTrue(state) {
            state.loading = true;
        },
        setLoadingFalse(state) {
            state.loading = false;
        },
        setSearchLoading(state) {
            state.searchLoading = true;
        },
        deleteSearchLoading(state) {
            state.searchLoading = false;
        },
        clearMessage(state) {
            state.messages = [];
            localStorage.removeItem("aichat");
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setUserUtteredMessage,
    setBotUtteredMessage,
    setFullscreen,
    deleteFullscreen,
    setKeyword,
    deleteKeyword,
    setLoadingTrue,
    setLoadingFalse,
    setSearchLoading,
    deleteSearchLoading,
    clearMessage,
} = chatSlice.actions;

// Export reducer to create store in app/store.tsx
export default chatSlice.reducer;
