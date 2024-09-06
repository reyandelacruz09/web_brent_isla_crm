import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Branch } from "../../components/branch/AddBranch";
const apiDomain = process.env.REACT_APP_API_DOMAIN;
const token = localStorage.getItem("mytoken");
// const account_detailed = JSON.parse(localStorage.getItem("account_detail"));

const dashboardApi = createApi({
  reducerPath: "dashboard",
  baseQuery: fetchBaseQuery({
    baseUrl: apiDomain,
  }),
  tagTypes: ["dashboard"],
  endpoints(builder) {
    return {
      DashTotalProducts: builder.query({
        query: ({ branch }) => {
          return {
            url: `/api/dashboard/inventory_summary/?branch=${branch}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["dashboard"],
      }),
      PieChart: builder.query({
        query: ({ branch }) => {
          return {
            url: `/api/dashboard/pie_chart/?branch=${branch}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["dashboard"],
      }),
      // product_chart
      ProductChart: builder.query({
        query: ({ branch }) => {
          return {
            url: `/api/dashboard/product_chart/?branch=${branch}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["dashboard"],
      }),
    };
  },
});

export const {
  useDashTotalProductsQuery,
  usePieChartQuery,
  useProductChartQuery,
} = dashboardApi;
export { dashboardApi };
