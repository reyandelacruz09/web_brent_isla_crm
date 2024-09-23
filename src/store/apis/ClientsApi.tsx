import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiDomain = process.env.REACT_APP_API_DOMAIN;
const token = localStorage.getItem("mytoken");
// const account_detailed = JSON.parse(localStorage.getItem("account_detail"));

interface Client {
  data(data: any): unknown;
  id: number;
  name: string;
}

interface ClientList {
  id: string;
  code: string;
  name: string;
  status: string;
  start_date: string;
  end_date: string;
  head: string;
  category: string;
}
const clientApi = createApi({
  reducerPath: "client",
  baseQuery: fetchBaseQuery({
    baseUrl: apiDomain,
  }),
  tagTypes: ["client"],
  endpoints(builder) {
    return {
      ClientList: builder.query<ClientList, string>({
        query: () => {
          return {
            url: `/api/client/client_list`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["client"],
      }),
      ClientCategoryList: builder.query<Client, string>({
        query: () => {
          return {
            url: `/api/client/client_category_list`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["client"],
      }),
      CreateClient: builder.mutation({
        query: (formBody) => {
          return {
            url: `/api/client/create_client/`,
            headers: {
              Authorization: "token " + token,
              // "Content-Type": "application/json",
              // Accept: "/",
            },
            body: formBody,
            method: "POST",
          };
        },
        invalidatesTags: ["client"],
      }),
      ViewClient: builder.query<ClientList, string>({
        query: (id) => {
          return {
            url: `/api/client/${id}/view_client`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["client"],
      }),
      UpdateClient: builder.mutation({
        query: (formBody) => {
          return {
            url: `/api/client/0/update_client/`,
            headers: { Authorization: "token " + token },
            body: formBody,
            method: "POST",
          };
        },
        invalidatesTags: ["client"],
      }),
      DeleteClient: builder.mutation({
        query: (id) => {
          return {
            url: `api/client/${id}/delete_client/`,
            headers: { Authorization: "token " + token },
            method: "POST",
          };
        },
        invalidatesTags: ["client"],
      }),
    };
  },
});

export const {
  useClientListQuery,
  useCreateClientMutation,
  useClientCategoryListQuery,
  useViewClientQuery,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientApi;
export { clientApi };
