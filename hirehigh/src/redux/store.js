import { configureStore } from '@reduxjs/toolkit';
import userSlice from './seeker';

const store = configureStore({
  reducer: {
    userInfo: userSlice.reducer,
  },
});

export default store