import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem("role") || "",
    data: JSON.parse(localStorage.getItem("data")) || {}
}


// now we make reducer using thunk
//* thunk -> It is also like a action but isme phle automatically promise resolve hoga tabhi ye action apne data ke sath dispatch hogaa
//* /auth/signup -> it is just a name of our thunk(unique key name for thunk)
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

// edit profile thunk
//! We can not pass two values in the thunk callback func (2nd values is passed as thunkapi) so avoid passing two values in the thunk callback func
export const updateProfile = createAsyncThunk("/user/editprofile", async (data)=> {
    console.log("updatee...",data);
    try {
        const res = axiosInstance.put(`/user/update/${data[0]}`, data[1]);

        // console.log(res);

        // show toast based on the conditon(state of promise)
        toast.promise(res, {
            loading: "Wait! profile updating in progress...",

            success: (data)=> {
                return data?.data?.message
            },

            error: "Failed to update profile"
        })

        return (await res).data;


    } catch (error) {

        toast.error(error?.response?.data?.message);
    }
})

// fetch userdata (after updations)
export const getUserDetails = createAsyncThunk("/user/datails", async ( )=> {

    try {
        const res = axiosInstance.get("user/me");

        // console.log("axios instance: ", await res);

        // console.log(res);

        return (await res).data;


    } catch (error) {

        toast.error(error.message);
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
                localStorage.setItem("role", action?.payload?.user?.role);

                //now update the state 
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
                state.role = action?.payload?.user?.role;
            })
            .addCase(logout.fulfilled, (state)=>{
                // after logout clear our local storage
                localStorage.clear();
                // now reset all states
                state.isLoggedIn = false;
                state.data = {};
                state.role = "";
            })

            .addCase(getUserDetails.fulfilled, (state, action)=>{
                console.log("Authslice user details: ",action);
                // set the details in local storage(browser side)
                localStorage.setItem("data", JSON.stringify(action?.payload?.user));
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("role", action?.payload?.user?.role);
    
                //now update the state 
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
                state.role = action?.payload?.user?.role;
            })
    }

})





// export const {} = authSlice.actions;
export default authSlice.reducer;