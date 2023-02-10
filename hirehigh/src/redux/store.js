
import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./seeker";


export const store = configureStore({
    reducer: {
        userInfo:userSlice.reducer,
    }
})