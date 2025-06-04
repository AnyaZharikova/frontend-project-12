import { createSlice } from '@reduxjs/toolkit'
import { channelsApi } from '../services/api/index.js'

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
  extraReducers: (builder) => {
    builder
      .addMatcher(
        channelsApi.endpoints.addChannel.matchFulfilled,
        (state, { payload }) => {
          state.activeChannelId = payload.id
        },
      )
      .addMatcher(
        channelsApi.endpoints.removeChannel.matchFulfilled,
        (state, { meta }) => {
          const removedChannelId = meta.arg.originalArgs

          if (state.activeChannelId === removedChannelId) {
            state.activeChannelId = defaultChannel
          }
        },
      )
  },
})

export const {
  setActiveChannel,
} = channelsSlice.actions

export default channelsSlice.reducer
