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
});


// course create thunk
export const createNewCourse = createAsyncThunk("/course/create", async (data)=> {

    try {
        // make form data
        const formData = new FormData();
        formData.append("title", data?.title)        
        formData.append("category", data?.category)        
        formData.append("createdBy", data?.createdBy)        
        formData.append("description", data?.description)        
        formData.append("thumbnail", data?.thumbnail)        

        // put a axios request
        const res = axiosInstance.post("/courses", formData);

        toast.promise(res, {
            loading: "Wait! Creating new course",

            success: "Course created successfully",

            error: "Failed to create course"
        })

        return (await res).data

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