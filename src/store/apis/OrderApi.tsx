import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiDomain = process.env.REACT_APP_API_DOMAIN;
const token = localStorage.getItem("mytoken");
// const account_detailed = JSON.parse(localStorage.getItem("account_detail"))

const orderApi = createApi({
  reducerPath: "order",
  baseQuery: fetchBaseQuery({
    baseUrl: apiDomain,
  }),
  endpoints(builder) {
    return {
      CreateOrder: builder.mutation({
        query: (formBody) => {
          return {
            url: `api/order/order_submit/`,
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
    };
  },
});

export const { useCreateOrderMutation } = orderApi;
export { orderApi };
