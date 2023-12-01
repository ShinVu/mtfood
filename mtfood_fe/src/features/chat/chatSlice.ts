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
};

const initialState: initialState = {
    messages: getLocalStorage("aiChat") ?? [],
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
    },
});

// Action creators are generated for each case reducer function
export const { setUserUtteredMessage, setBotUtteredMessage } =
    chatSlice.actions;

// Export reducer to create store in app/store.tsx
export default chatSlice.reducer;
