import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiDomain = process.env.REACT_APP_API_DOMAIN;
const token = localStorage.getItem("mytoken");
// const account_detailed = JSON.parse(localStorage.getItem("account_detail"))

const orderApi = createApi({
  reducerPath: "order",
  baseQuery: fetchBaseQuery({
    baseUrl: apiDomain,
  }),
  tagTypes: ["order"],
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
        invalidatesTags: ["order"],
      }),
      OrderList: builder.query({
        query: () => {
          return {
            url: `/api/order/order_list`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["order"],
      }),
      OrderListCustomer: builder.query({
        query: (id) => {
          return {
            url: `/api/order/${id}/order_list_customer`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["order"],
      }),
      OrderCustomerDetails: builder.query({
        query: (id) => {
          return {
            url: `/api/order/${id}/customer_details`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["order"],
      }),
      OrderView: builder.query({
        query: (id) => {
          return {
            url: `/api/order/${id}/view_order`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["order"],
      }),
      OrderUpdateStatus: builder.mutation({
        query: (formBody) => {
          return {
            url: `api/order/0/update_status/`,
            headers: {
              // Authorization: "token " + token,
              // "Content-Type": "application/json",
              // Accept: "/",
            },
            body: formBody,
            method: "POST",
          };
        },
        invalidatesTags: ["order"],
      }),
      OrderGetStatus: builder.query({
        query: (id) => {
          return {
            url: `/api/order/${id}/get_status`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["order"],
      }),
      // /api/order/<phone1>/cust_info
      CustomerInfo: builder.query({
        query: (id) => {
          return {
            url: `/api/order/${id}/cust_info`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["order"],
      }),
      CustomerInfoID: builder.query({
        query: (id) => {
          return {
            url: `/api/order/${id}/cust_info_id`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["order"],
      }),
      CustomerOrderID: builder.query({
        query: (id) => {
          return {
            url: `/api/order/${id}/view_order_id`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["order"],
      }),
    };
  },
});

export const {
  useCreateOrderMutation,
  useOrderListQuery,
  useOrderListCustomerQuery,
  useOrderCustomerDetailsQuery,
  useOrderViewQuery,
  useOrderUpdateStatusMutation,
  useOrderGetStatusQuery,
  useCustomerInfoQuery,
  useCustomerInfoIDQuery,
  useCustomerOrderIDQuery,
} = orderApi;
export { orderApi };
