import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Branch } from "../../components/branch/AddBranch";
const apiDomain = process.env.REACT_APP_API_DOMAIN;
const token = localStorage.getItem("mytoken");
// const account_detailed = JSON.parse(localStorage.getItem("account_detail"));

const branchApi = createApi({
  reducerPath: "branch",
  baseQuery: fetchBaseQuery({
    baseUrl: apiDomain,
  }),
  tagTypes: ["branch", "products"],
  endpoints(builder) {
    return {
      BranchList: builder.query({
        query: ({ owner, page, pageSize, searchQuery }) => {
          return {
            url: `/api/branch/branch_list/?owner=${owner}&page=${
              page + 1
            }&page_size=${pageSize}&query=${searchQuery}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["branch"],
      }),
      CreateBranch: builder.mutation({
        query: (formBody) => {
          return {
            url: `api/branch/create_branch/`,
            headers: {
              Authorization: "token " + token,
              // "Content-Type": "application/json",
              // Accept: "/",
            },
            body: formBody,
            method: "POST",
          };
        },
        invalidatesTags: ["branch"],
      }),
      ViewBranch: builder.query<Branch, string>({
        query: (id) => {
          return {
            url: `/api/branch/${id}/view_branch`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["branch"],
      }),
      UpdateBranch: builder.mutation({
        query: (formBody) => {
          return {
            url: `api/branch/0/update_branch/`,
            headers: { Authorization: "token " + token },
            body: formBody,
            method: "POST",
          };
        },
        invalidatesTags: ["branch"],
      }),
      DeleteBranch: builder.mutation({
        query: (id) => {
          return {
            url: `api/branch/${id}/delete_branch/`,
            headers: { Authorization: "token " + token },
            method: "POST",
          };
        },
        invalidatesTags: ["branch"],
      }),
      //get_series_type
      GetSeriesProductBranch: builder.query({
        query: ({ branch, type }) => {
          return {
            url: `/api/products/get_series_type/?branch=${branch}&type=${type}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["branch"],
      }),
    };
  },
});

export const {
  useBranchListQuery,
  useCreateBranchMutation,
  useViewBranchQuery,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
  useGetSeriesProductBranchQuery,
} = branchApi;
export { branchApi };
