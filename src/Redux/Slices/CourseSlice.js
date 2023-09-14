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
    extraReducers: (builder)=>{
        builder.addCase(getAllCourses.fulfilled, (state, action)=> {
            if(action?.payload){
                console.log(action.payload);
                 //action.payload me courses ka data hoga (sare course array me destructure ho jayenge)
                state.courseData = [...action.payload];    
            }
        })
    }
});

export default courseSlice.reducer;