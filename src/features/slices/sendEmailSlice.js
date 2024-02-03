import { createSlice } from "@reduxjs/toolkit"
import { sendEamil } from "../../service/senEmailService";

const initialState = {
    status: "idle",
    error: "",
}

const emailSlice = createSlice({
    name: "Send Eamil",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(sendEamil.pending, (state) => {
            state.status = "loading";
        })
        .addCase(sendEamil.fulfilled, (state) => {
            state.status = "success";
        })
        .addCase(sendEamil.rejected, (state) => {
            state.error = "rejected";
        })
    }
})

export default emailSlice.reducer;