import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    key: "",
    subscription_id: "",
    isPaymentVerified: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: [] 
}

// create a thunk for razorpayKey
export const getRazorpayKey = createAsyncThunk("/razorpay/getKey", async ()=>{ 
    try {
        const res = await axiosInstance.get("/payments/razorpay-key")

        return res.data;
    } catch (error) {
        toast.error("Failed to create razorpay key")
    }
})

// create a thunk for purchase course
export const purchaseCourseBundle = createAsyncThunk("/puchaseCourse", async ()=>{ 
    try {
        const res = await axiosInstance.post("/payments/subscribe")

        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

// create a thunk for verify payment
export const verifyUserPayment = createAsyncThunk("/razorpay/verify", async (data)=>{ 
    console.log(data.razorpay_subscription_id);
    try {
        const res = await axiosInstance.post("/payments/verify", {
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature: data.razorpay_signature
        });

        console.log("verify...", res);
        return res?.data;
    } catch (error) {
        toast.error("Payment is not verified")
    }
})

// create a thunk for unsubscribe the course
export const unsubscibeCourseBundle = createAsyncThunk("/razorpay/unsubscribe", async ()=>{ 
    try {
        const res =  axiosInstance.post("/payments/unsubscribe");

        toast.promise(res, {
            loading: "Unsubscibing the course bundle",
            success: (data)=>{
                return data?.data?.message
            },

            error: "failed to unsubscibe"
        })

        return (await res).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

// create a thunk for get all payments records
export const getPaymentRecords = createAsyncThunk("/razorpay/records", async ()=>{ 
    try {
        const res =  axiosInstance.get("/payments?count=100");

        toast.promise(res, {
            loading: "Getting the payment records",
            success: (data)=>{
                return data?.data?.message
            },

            error: "failed to get payments records"
        })

        return (await res).data
    } catch (error) {
        toast.error("Operation failed")
    }
})


// create a slice 
const razorpaySlice = createSlice({
    name: "razorpay",
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder
            .addCase(getRazorpayKey.fulfilled, (state, action)=> {
                // set the razorpay key to state
                state.key = action?.payload?.key;
            })
            .addCase(purchaseCourseBundle.fulfilled, (state, action)=>{
                // set the subsciption id
                state.subscription_id = action?.payload?.subscription_id;
            })
            .addCase(verifyUserPayment.fulfilled, (state, action)=> {
                // set payment is verified 
                toast.success(action?.payload?.message)     // show toast
                // toast.success("Payment is verified")     // show toast
                state.isPaymentVerified = action?.payload?.success;
            })
            .addCase(verifyUserPayment.rejected, (state, action)=> {
                // set payment is verified 
                toast.error(action?.payload?.message)     // show toast
                state.isPaymentVerified = action?.payload?.success;
            })
            .addCase(getPaymentRecords.fulfilled, (state, action)=> {
                // set payment is verified 
                state.allPayments = action?.payload?.subscriptions;
                state.finalMonths = action?.payload?.finalMonths;
                state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
            })
    }
})


export default razorpaySlice.reducer;