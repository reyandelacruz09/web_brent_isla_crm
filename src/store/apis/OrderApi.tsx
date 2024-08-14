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
      OrderList: builder.query({
        query: () => {
          return {
            url: `/api/order/order_list`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
      }),
      // /api/order/<cust_id>/order_list_customer
      OrderListCustomer: builder.query({
        query: (id) => {
          return {
            url: `/api/order/${id}/order_list_customer`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
      }),
      ///api/order/<cust_id>/customer_details
      OrderCustomerDetails: builder.query({
        query: (id) => {
          return {
            url: `/api/order/${id}/customer_details`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useCreateOrderMutation,
  useOrderListQuery,
  useOrderListCustomerQuery,
  useOrderCustomerDetailsQuery,
} = orderApi;
export { orderApi };
