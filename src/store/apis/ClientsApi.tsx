import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Client } from "../../components/product/SearchInputOwner";
const apiDomain = process.env.REACT_APP_API_DOMAIN;
const token = localStorage.getItem("mytoken");
// const account_detailed = JSON.parse(localStorage.getItem("account_detail"));

const clientApi = createApi({
  reducerPath: "client",
  baseQuery: fetchBaseQuery({
    baseUrl: apiDomain,
  }),
  endpoints(builder) {
    return {
      ClientList: builder.query<Client, string>({
        query: () => {
          return {
            url: `/api/client/client_list`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useClientListQuery } = clientApi;
export { clientApi };
