import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    lectures: []
}

// make a thunk for get all lectures 
export const getCourseLectures = createAsyncThunk("/course/lectures", async (cid)=> {
    try {
        const res = axiosInstance.get(`/courses/${cid}`);

        toast.promise(res, {
            loading: "Fetching course lectures",
            success: "Lectures fetched successfully",
            error: "Failed to load all lectures"
        });

        return (await res).data;
        
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

// make a thunk for add course lectures by admin
export const addCourseLecture = createAsyncThunk("/course/lecture/add", async (data)=> {
    try {
        const formData = new FormData();
        formData.append("lecture", data.lecture)
        formData.append("title", data.title)
        formData.append("description", data.description)

        const res = axiosInstance.post(`/courses/${data.id}`, formData);

        toast.promise(res, {
            loading: "Adding lecture into course",
            success: "Lecture Added successfully",
            error: "Failed to add lecture"
        });

        return (await res).data;
        
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

// thunk for delete course lecture
export const deleteCourseLecture = createAsyncThunk("lecture/delete", async (data)=> {
    console.log(data);

    try {
        const res = axiosInstance.delete(`/courses/?courseId=${data.courseId}&lectureId=${data.lectureId}`);

        toast.promise(res, {
            loading: "Deleting the lecture",
            success: "Lecture deleted successfully",
            error: "Failed to delete lecture"
        })

        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})
 

const LecturesSlice = createSlice({
    name: "lectures",
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder
            .addCase(getCourseLectures.fulfilled, (state, action)=> {
                console.log("getlectures: ", action);
                state.lectures = action?.payload?.lectures;
            })
            .addCase(addCourseLecture.fulfilled, (state, action)=> {
                console.log("addlectures: ", action);
                state.lectures = action?.payload?.course?.lectures;
            })

    }
})

export default LecturesSlice.reducer;