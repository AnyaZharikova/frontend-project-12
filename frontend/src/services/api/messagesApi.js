import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import routes, { apiPath } from '../../routes'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
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
  }),
})

const {
  useGetMessagesQuery,
  useAddMessageMutation,
} = messagesApi

export {
  useGetMessagesQuery as getMessagesQuery,
  useAddMessageMutation as addMessageMutation,
}
