import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiDomain = process.env.REACT_APP_API_DOMAIN;
const token = localStorage.getItem("mytoken");
// const account_detailed = JSON.parse(localStorage.getItem("account_detail"))

const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: apiDomain,
  }),
  tagTypes: ["user"],
  endpoints(builder) {
    return {
      CreateUser: builder.mutation({
        query: (formBody) => {
          return {
            url: `api/user/create_user/`,
            headers: {
              Authorization: "token " + token,
              // "Content-Type": "application/json",
              // Accept: "/",
            },
            body: formBody,
            method: "POST",
          };
        },
        invalidatesTags: ["user"],
      }),
      UserList: builder.query({
        query: ({ page, pageSize, searchQuery }) => {
          return {
            url: `/api/user/account_list/?page=${
              page + 1
            }&page_size=${pageSize}&query=${searchQuery}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["user"],
      }),
      ViewUser: builder.query({
        query: (id) => {
          return {
            url: `/api/user/${id}/view_account`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["user"],
      }),
      UpdateUser: builder.mutation({
        query: (formBody) => {
          return {
            url: `/api/user/0/update_account/`,
            headers: { Authorization: "token " + token },
            body: formBody,
            method: "POST",
          };
        },
        invalidatesTags: ["user"],
      }),
      DeleteUser: builder.mutation({
        query: (id) => {
          return {
            url: `api/user/${id}/delete_account/`,
            headers: { Authorization: "token " + token },
            method: "POST",
          };
        },
        invalidatesTags: ["user"],
      }),
    };
  },
});

export const {
  useCreateUserMutation,
  useUserListQuery,
  useViewUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
export { userApi };
