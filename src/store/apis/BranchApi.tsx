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
  tagTypes: ["branch"],
  endpoints(builder) {
    return {
      BranchList: builder.query({
        query: ({ owner }) => {
          return {
            url: `/api/branch/branch_list/?owner=${owner}`,
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
              // Authorization: "token " + token,
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
    };
  },
});

export const {
  useBranchListQuery,
  useCreateBranchMutation,
  useViewBranchQuery,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
} = branchApi;
export { branchApi };
