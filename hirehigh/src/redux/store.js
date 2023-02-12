import { configureStore } from '@reduxjs/toolkit';
import userSlice from './seeker';
import adminSlice from './admin';
import recruiterSlice from './recruiter';

const store = configureStore({
  reducer: {
    userInfo: userSlice.reducer,
    adminInfo: adminSlice.reducer,
    recruiterInfo: recruiterSlice.reducer,
  },
});

export default store;
