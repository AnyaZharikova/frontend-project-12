import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice.js'
import channelsReducer from '../slices/channelsSlice.js'
import modalsReducer from '../slices/modalsSlice.js'
import { chatApi } from './chatApi'

const store = configureStore({
  reducer: {
    authReducer,
    channelsReducer,
    modalsReducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(chatApi.middleware),
})

export default store
