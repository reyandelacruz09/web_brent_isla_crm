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
  endpoints(builder) {
    return {
      BranchList: builder.query<Branch, string>({
        query: () => {
          return {
            url: `/api/branch/branch_list`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
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
      }),
      ViewBranch: builder.query<Branch, string>({
        query: (id) => {
          return {
            url: `/api/branch/${id}/view_branch`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
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
      }),
      DeleteBranch: builder.mutation({
        query: (id) => {
          return {
            url: `api/branch/${id}/delete_branch/`,
            headers: { Authorization: "token " + token },
            method: "POST",
          };
        },
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
