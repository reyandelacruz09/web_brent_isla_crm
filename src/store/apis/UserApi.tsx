import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiDomain = process.env.REACT_APP_API_DOMAIN;
const token = localStorage.getItem("mytoken");
// const account_detailed = JSON.parse(localStorage.getItem("account_detail"))

const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: apiDomain,
  }),
  endpoints(builder) {
    return {
      CreateUser: builder.mutation({
        query: (formBody) => {
          return {
            url: `api/user/create_user/`,
            headers: {
              // Authorization: "token " + token,
              // "Content-Type": "application/json",
              // Accept: "/",
            },
            body: formBody,
            method: "POST",
          };
        },
      }),
      UserList: builder.query({
        query: () => {
          return {
            url: `/api/user/account_list`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
      }),
      ViewUser: builder.query({
        query: (id) => {
          return {
            url: `/api/user/${id}/view_account`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
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
      }),
      DeleteUser: builder.mutation({
        query: (id) => {
          return {
            url: `api/user/${id}/delete_account/`,
            headers: { Authorization: "token " + token },
            method: "POST",
          };
        },
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
