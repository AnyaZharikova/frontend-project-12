/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPath } from '../routes';

const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiPath,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().authReducer;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Channels', 'Messages'],
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (userData) => ({
        url: '/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: '/login',
        method: 'POST',
        body: userData,
      }),
    }),
    getChannels: builder.query({
      query: () => '/channels',
      providesTags: ['Channels'],
    }),
    getMessages: builder.query({
      query: () => '/messages',
      providesTags: ['Messages'],
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: '/messages',
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Messages'],
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        url: '/channels',
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: ['Channels'],
    }),
    editChannel: builder.mutation({
      query: (channel) => ({
        url: `channels/${channel.id}`,
        method: 'PATCH',
        body: { name: channel.name },
      }),
      invalidatesTags: ['Channels'],
    }),
    removeChannel: builder.mutation({
      query: (channelId) => ({
        url: `channels/${channelId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channels', 'Messages'],
    }),
  }),
});

const {
  useSignupUserMutation,
  useLoginUserMutation,
  useGetChannelsQuery,
  useGetMessagesQuery,
  useAddMessageMutation,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} = chatApi;

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
};
