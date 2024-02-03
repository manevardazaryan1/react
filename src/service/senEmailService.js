import { createAsyncThunk } from "@reduxjs/toolkit";
import emailjs from "@emailjs/browser";
import { SERVICEID, TEMPLATEID, API } from "../constants/constant"; 

export const sendEamil = createAsyncThunk("Send/Data", async (template) => {
    try {
        const response = await emailjs.send(SERVICEID, TEMPLATEID, template, API);
        return response;
    } catch(error) {
        return {error}
    }
})