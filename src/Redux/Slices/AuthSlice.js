import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

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

// login thunk
export const LogIn = createAsyncThunk("/auth/login", async (data)=> {

    try {
        const res = axiosInstance.post("user/login", data);

        // show toast based on the conditon(state of promise)
        toast.promise(res, {
            loading: "Wait! Authentication is processing...",

            success: (data)=> {
                return data?.data?.message
            },

            error: "Failed to login"
        })

        return (await res).data;


    } catch (error) {

        toast.error(error?.response?.data?.message);
    }

})


// logout thunk
export const logout = createAsyncThunk("/auth/logout", async ()=> {
    try {
        const res = axiosInstance.get("user/logout");

        // show toast based on the conditon(state of promise)
        toast.promise(res, {
            loading: "Wait! Logout is processing...",

            success: (data)=> {
                return data?.data?.message
            },

            error: "Failed to logout"
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
    extraReducers: (builder)=>{
        builder
            .addCase(LogIn.fulfilled, (state, action)=>{
            console.log(action);
            // set the details in local storage(browser side)
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", JSON.stringify(action?.payload?.role));

            //now update the state 
            state.isLoggedIn =true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.role;
        })
            .addCase(logout.fulfilled, (state)=>{
                // after logout clear our local storage
                localStorage.clear();
                // now reset all states
                state.isLoggedIn=false;
                state.data = {};
                state.role = "";
            })
    }

})

// export const {} = authSlice.actions;
export default authSlice.reducer;