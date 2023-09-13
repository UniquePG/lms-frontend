import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    courseData: [],
}

// make asynce thunk for get courses
export const getAllCourses = createAsyncThunk("/course/get", async ()=>{

    try {
        const response = axiosInstance.get("/courses")

        toast.promise(response, {
            loading:"Loading courses data...",
            success: "courses loaded successfully!",
            error: "Failed to load all courses"
        })

        return (await response).data.courses;


    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})


const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    // extraReducers: (builder)=>{

    // }
});

export default courseSlice.reducer;