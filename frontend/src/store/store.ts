// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/category/CategorySlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
  },
});

// Optionally export types for TypeScript usage:
export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
