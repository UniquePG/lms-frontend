import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem("role") || '',
    data: localStorage.getItem("data") || {},
}

// make auth slice
const authSlice = createSlice({
    name:'auth', // name of the reducer
    initialState,
    reducers: {},

})

// export const {} = authSlice.actions;
export default authSlice.reducer;