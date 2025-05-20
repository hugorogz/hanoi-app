import { configureStore } from '@reduxjs/toolkit';
import hanoiReducer from '../redux/hanoiSlice';

export const store = configureStore({
  reducer: {
    results: hanoiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
