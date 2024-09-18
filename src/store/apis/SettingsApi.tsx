import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiDomain = process.env.REACT_APP_API_DOMAIN;
const token = localStorage.getItem("mytoken");
// const account_detailed = JSON.parse(localStorage.getItem("account_detail"))

const settingsApi = createApi({
  reducerPath: "settings",
  baseQuery: fetchBaseQuery({
    baseUrl: apiDomain,
  }),
  tagTypes: ["settings"],
  endpoints(builder) {
    return {
      AddAccountRole: builder.mutation({
        query: (formBody) => {
          return {
            url: `/api/settings/add_AccountRoles/`,
            headers: {
              // Authorization: "token " + token,
              // "Content-Type": "application/json",
              // Accept: "/",
            },
            body: formBody,
            method: "POST",
          };
        },
        invalidatesTags: ["settings"],
      }),
      AccountRoleList: builder.query({
        query: () => {
          return {
            url: `/api/settings/view_AccountRoles`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["settings"],
      }),
      EditRoles: builder.query({
        query: ({ client, role }) => {
          return {
            url: `/api/settings/view_Roles/?client=${client}&role=${role}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["settings"],
      }),
      UpdateRole: builder.mutation({
        query: (formBody) => {
          return {
            url: `/api/settings/update_role/`,
            headers: {
              // Authorization: "token " + token,
              // "Content-Type": "application/json",
              // Accept: "/",
            },
            body: formBody,
            method: "POST",
          };
        },
        invalidatesTags: ["settings"],
      }),
      // /api/settings/get_roles/?client=1&role=3
      GetRoles: builder.query({
        query: ({ client, role }) => {
          return {
            url: `/api/settings/get_roles/?client=${client}&role=${role}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["settings"],
      }),
      GetCustomerField: builder.query({
        query: () => {
          return {
            url: `/api/settings/get_customer_field`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["settings"],
      }),
      GetCustomerFilter: builder.query({
        query: ({ conditions }) => {
          return {
            url: `/api/settings/get_filtered_customer/?conditions=${conditions}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["settings"],
      }),
    };
  },
});

export const {
  useAccountRoleListQuery,
  useEditRolesQuery,
  useAddAccountRoleMutation,
  useUpdateRoleMutation,
  useGetRolesQuery,
  useGetCustomerFieldQuery,
  useGetCustomerFilterQuery,
} = settingsApi;
export { settingsApi };
