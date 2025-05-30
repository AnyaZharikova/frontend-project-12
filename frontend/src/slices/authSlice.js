import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: null,
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { username = null, token } = action.payload
      state.username = username
      state.token = token
    },
    logOut: (state) => {
      state.username = null
      state.token = null
    },
  },
})

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer
