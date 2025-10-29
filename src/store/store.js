import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../Features/auth/authSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        //add more slices for post
    }
});

export default store;