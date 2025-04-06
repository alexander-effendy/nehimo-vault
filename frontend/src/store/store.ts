// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/CategorySlice';
import passwordReducer from '../features/PasswordSlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    password: passwordReducer,
  },
});

// Optionally export types for TypeScript usage:
export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
