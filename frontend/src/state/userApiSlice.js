import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApiSlice = createApi({
  reducerPath: 'userApiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5050',
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['User'],
    }),
    addNewUser: builder.mutation({
      query: (payload) => ({
        url: '/add',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['User'],
    }),
  }),
})
export const { useGetPostsQuery, useAddNewPostMutation } = userApiSlice