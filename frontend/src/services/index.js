import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice.js';
import { chatApi } from './chatApi';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(chatApi.middleware),
});

export default store;
