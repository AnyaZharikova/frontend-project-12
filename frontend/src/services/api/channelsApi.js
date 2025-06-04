import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import routes, { apiPath } from '../../routes'

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiPath,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().authReducer

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ['Channels', 'Messages'],
  endpoints: builder => ({
    getChannels: builder.query({
      query: () => routes.channelsPath(),
      providesTags: ['Channels'],
    }),
    addChannel: builder.mutation({
      query: channel => ({
        url: routes.channelsPath(),
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: ['Channels'],
    }),
    editChannel: builder.mutation({
      query: channel => ({
        url: routes.channelPath(channel.id),
        method: 'PATCH',
        body: { name: channel.name },
      }),
      invalidatesTags: ['Channels'],
    }),
    removeChannel: builder.mutation({
      query: channelId => ({
        url: routes.channelPath(channelId),
        method: 'DELETE',
      }),
      invalidatesTags: ['Channels', 'Messages'],
    }),
  }),
})

const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} = channelsApi

export {
  useGetChannelsQuery as getChannelsQuery,
  useAddChannelMutation as addChannelMutation,
  useEditChannelMutation as editChannelMutation,
  useRemoveChannelMutation as removeChannelMutation,
}
