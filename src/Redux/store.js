import { configureStore } from '@reduxjs/toolkit';

import authSliceReducer from './Slices/AuthSlice.js';

const store = configureStore({
    reducer: {
        auth: authSliceReducer      // auth slice reducer
    },
    devTools: true,
})

export default store;