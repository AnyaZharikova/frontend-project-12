/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPath } from '../routes';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiPath,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Channels', 'Messages'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '/channels',
      providesTags: ['Channels'],
    }),
    getMessages: builder.query({
      query: () => '/messages',
      providesTags: ['Messages'],
    }),
    addMessage: builder.mutation({
      query: (message) => ({ url: '/messages', method: 'POST', body: message }),
      invalidatesTags: ['Messages'],
    }),
  }),
});

const {
  useGetChannelsQuery,
  useGetMessagesQuery,
  useAddMessageMutation,
} = chatApi;

export {
  useGetChannelsQuery as getChannelsQuery,
  useGetMessagesQuery as getMessagesQuery,
  useAddMessageMutation as addMessageMutation,
};
