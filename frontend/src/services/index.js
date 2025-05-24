import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice.js';
import messageReducer from '../slices/messagesSlice.js';
import { chatApi } from './chatApi';

const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messageReducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(chatApi.middleware),
});

export default store;
