import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import routes, { apiPath } from '../routes'

const chatApi = createApi({
  reducerPath: 'chatApi',
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
    signupUser: builder.mutation({
      query: userData => ({
        url: routes.registerPath(),
        method: 'POST',
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: userData => ({
        url: routes.loginPath(),
        method: 'POST',
        body: userData,
      }),
    }),
    getMessages: builder.query({
      query: () => routes.messagesPath(),
      providesTags: ['Messages'],
    }),
    addMessage: builder.mutation({
      query: message => ({
        url: routes.messagesPath(),
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Messages'],
    }),
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
  useSignupUserMutation,
  useLoginUserMutation,
  useGetChannelsQuery,
  useGetMessagesQuery,
  useAddMessageMutation,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} = chatApi

export {
  chatApi,
  useSignupUserMutation as signupUserMutation,
  useLoginUserMutation as loginUserMutation,
  useGetChannelsQuery as getChannelsQuery,
  useGetMessagesQuery as getMessagesQuery,
  useAddMessageMutation as addMessageMutation,
  useAddChannelMutation as addChannelMutation,
  useEditChannelMutation as editChannelMutation,
  useRemoveChannelMutation as removeChannelMutation,
}
