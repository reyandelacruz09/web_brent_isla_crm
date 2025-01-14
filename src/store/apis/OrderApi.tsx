import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiDomain = process.env.REACT_APP_API_DOMAIN;
const token = localStorage.getItem("mytoken");
// const account_detailed = JSON.parse(localStorage.getItem("account_detail"))

const orderApi = createApi({
  reducerPath: "order",
  baseQuery: fetchBaseQuery({
    baseUrl: apiDomain,
  }),
  tagTypes: ["order", "dashboard", "settings"],
  endpoints(builder) {
    return {
      CreateOrder: builder.mutation({
        query: (formBody) => {
          return {
            url: `api/order/order_submit/`,
            headers: {
              Authorization: "token " + token,
              // "Content-Type": "application/json",
              // Accept: "/",
            },
            body: formBody,
            method: "POST",
          };
        },
        invalidatesTags: ["order", "dashboard"],
      }),
      OrderList: builder.query({
        query: ({
          owner,
          page,
          pageSize,
          searchQuery,
          rt_type,
          role,
          branch,
        }) => {
          return {
            url: `/api/order/order_list/?owner=${owner}&page=${
              page + 1
            }&page_size=${pageSize}&query=${searchQuery}&rt_type=${rt_type}&role=${role}&branch=${branch}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["order"],
      }),
      OrderListHistory: builder.query({
        query: ({
          owner,
          page,
          pageSize,
          searchQuery,
          rt_type,
          role,
          branch,
        }) => {
          return {
            url: `/api/order/order_list_history/?owner=${owner}&page=${
              page + 1
            }&page_size=${pageSize}&query=${searchQuery}&rt_type=${rt_type}&role=${role}&branch=${branch}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["order"],
      }),
      //order_list_status
      OrderListStatus: builder.query({
        query: ({
          owner,
          page,
          pageSize,
          searchQuery,
          status,
          rt_type,
          role,
          branch,
        }) => {
          return {
            url: `/api/order/order_list_status/?owner=${owner}&page=${
              page + 1
            }&page_size=${pageSize}&query=${searchQuery}&status=${status}&rt_type=${rt_type}&role=${role}&branch=${branch}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["order"],
      }),
      OrderListCustomer: builder.query({
        query: ({ id, page, pageSize }) => {
          return {
            url: `/api/order/${id}/order_list_customer/?page=${
              page + 1
            }&page_size=${pageSize}`,
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
              Authorization: "token " + token,
              // "Content-Type": "application/json",
              // Accept: "/",
            },
            body: formBody,
            method: "POST",
          };
        },
        invalidatesTags: ["order", "dashboard"],
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
      ///api/order/<code>/cust_info_code
      CustomerInfoCode: builder.query({
        query: (id) => {
          return {
            url: `/api/order/${id}/cust_info_code`,
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
      CompleteOrder: builder.query({
        query: (id) => {
          return {
            url: `/api/order/${id}/view_complete_order`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["order"],
      }),
      CompleteOrderTotal: builder.query({
        query: (id) => {
          return {
            url: `/api/order/${id}/view_complete_order_total`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["order"],
      }),
      UpdateOrder: builder.mutation({
        query: (formBody) => {
          return {
            url: `api/order/0/update_order/`,
            headers: { Authorization: "token " + token },
            body: formBody,
            method: "POST",
          };
        },
        invalidatesTags: ["order", "dashboard"],
      }),
      ///api/order/view_complaints
      ViewComplaints: builder.query({
        query: ({ owner, page, pageSize, searchQuery, role, branch }) => {
          return {
            url: `api/order/view_complaints/?owner=${owner}&page=${
              page + 1
            }&page_size=${pageSize}&query=${searchQuery}&role=${role}&branch=${branch}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["order"],
      }),
      //view_complaints_id
      ViewComplaintsID: builder.query({
        query: ({ cpid }) => {
          return {
            url: `api/order/view_complaints_id/?cpid=${cpid}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["order"],
      }),
      ///api/order/get_address/?barangay_id=6525
      LocateAddress: builder.query({
        query: ({ barangay_id }) => {
          return {
            url: `api/order/get_address/?barangay_id=${barangay_id}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["order"],
      }),
      ///api/order/view_customer/?department_id=1
      ListCustomer: builder.query({
        query: ({ department_id }) => {
          return {
            url: `api/order/view_customer/?department_id=${department_id}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["order"],
      }),
      ///api/order/get_complaint/
      // PassComplaint: builder.mutation({
      //   query: (formBody) => {
      //     return {
      //       url: `api/order/pass_complaint/`,
      //       headers: {
      //         Authorization: "token " + token,
      //         "Content-Type": "application/json",
      //       },
      //       body: formBody,
      //       method: "POST",
      //     };
      //   },
      //   invalidatesTags: ["order"],
      // }),
    };
  },
});

export const {
  useCreateOrderMutation,
  useOrderListQuery,
  useOrderListHistoryQuery,
  useOrderListStatusQuery,
  useOrderListCustomerQuery,
  useOrderCustomerDetailsQuery,
  useOrderViewQuery,
  useOrderUpdateStatusMutation,
  useOrderGetStatusQuery,
  useCustomerInfoQuery,
  useCustomerInfoCodeQuery,
  useCustomerInfoIDQuery,
  useCustomerOrderIDQuery,
  useCompleteOrderQuery,
  useCompleteOrderTotalQuery,
  useUpdateOrderMutation,
  useViewComplaintsQuery,
  useViewComplaintsIDQuery,
  useLocateAddressQuery,
  useListCustomerQuery,
  // usePassComplaintMutation,
} = orderApi;
export { orderApi };
