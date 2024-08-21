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
    };
  },
});

export const { useAccountRoleListQuery, useEditRolesQuery } = settingsApi;
export { settingsApi };
