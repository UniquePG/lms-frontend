import { configureStore } from '@reduxjs/toolkit';

import authSliceReducer from './Slices/AuthSlice.js';
import CourseSliceReducer from "./Slices/CourseSlice.js";
import LectureSliceReducer from "./Slices/LecturesSlice.js";
import RazorpaySliceReducer from "./Slices/RazorpaySlice.js";

const store = configureStore({
    reducer: {
        auth: authSliceReducer,      // auth slice reducer
        course: CourseSliceReducer,  // course slice reducer
        razorpay: RazorpaySliceReducer,  // razorpay slice reducer
        lecture: LectureSliceReducer,
    },
    devTools: true,
})

export default store;