import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem("role") || '',
    data: localStorage.getItem("data") || {},
}


// now we make reducer using thunk
//* thunk -> It is also like a action but isme phle automatically promise resolve hoga tabhi ye action apne data ke sath dispatch hogaa
export const createAccount = createAsyncThunk("/auth/signup", async (data)=> {

    try {
        const res = axiosInstance.post("user/register", data);

        // show toast based on the conditon(state of promise)
        toast.promise(res, {
            loading: "Wait! Creating your account",

            success: (data)=> {
                return data?.data?.message || "Successfully create your account"
            },

            error: "Failed to create account"
        })

        return (await res).data;


    } catch (error) {

        toast.error(error?.response?.data?.message);
    }

})



// make auth slice
const authSlice = createSlice({
    name:'auth', // name of the reducer
    initialState,
    reducers: {},

})

// export const {} = authSlice.actions;
export default authSlice.reducer;