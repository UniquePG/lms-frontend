import { configureStore } from '@reduxjs/toolkit';

import authSliceReducer from './Slices/AuthSlice.js';
import CourseSliceReducer from "./Slices/CourseSlice.js"
import RazorpaySliceReducer from "./Slices/RazorpaySlice.js"

const store = configureStore({
    reducer: {
        auth: authSliceReducer,      // auth slice reducer
        course: CourseSliceReducer,  // course slice reducer
        razorpay: RazorpaySliceReducer  // razorpay slice reducer
    },
    devTools: true,
})

export default store;