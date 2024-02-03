import { configureStore } from "@reduxjs/toolkit";
import sendEmailReducer from "../slices/sendEmailSlice";

export const store = configureStore({
    reducer: {
        email: sendEmailReducer,
    }
})