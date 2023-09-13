import { configureStore } from '@reduxjs/toolkit';

import authSliceReducer from './Slices/AuthSlice.js';
import CourseSliceReducer from "./Slices/CourseSlice.js"

const store = configureStore({
    reducer: {
        auth: authSliceReducer,      // auth slice reducer
        course: CourseSliceReducer  // course slice reducer
    },
    devTools: true,
})

export default store;