import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice.js'
import channelsReducer from '../slices/channelsSlice.js'
import modalsReducer from '../slices/modalsSlice.js'

import { authApi, channelsApi, messagesApi } from './api/index.js'

const store = configureStore({
  reducer: {
    authReducer,
    channelsReducer,
    modalsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
    authApi.middleware,
    channelsApi.middleware,
    messagesApi.middleware,
  ),
})

export default store
