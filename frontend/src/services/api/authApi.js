import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import routes, { apiPath } from '../../routes'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
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
  }),
})

const {
  useSignupUserMutation,
  useLoginUserMutation,
} = authApi

export {
  useSignupUserMutation as signupUserMutation,
  useLoginUserMutation as loginUserMutation,
}
