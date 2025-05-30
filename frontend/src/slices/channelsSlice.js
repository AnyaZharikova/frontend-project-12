import { createSlice } from '@reduxjs/toolkit'

const defaultChannel = 1

const initialState = {
  activeChannelId: defaultChannel,
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setActiveChannel: (state, { payload }) => {
      state.activeChannelId = payload
    },
  },
})

export const {
  setActiveChannel,
} = channelsSlice.actions

export default channelsSlice.reducer
