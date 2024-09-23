import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiDomain = process.env.REACT_APP_API_DOMAIN;
const token = localStorage.getItem("mytoken");
// const account_detailed = JSON.parse(localStorage.getItem("account_detail"))

interface Category {
  id: string;
  name: string;
  code: string;
  branch: string;
}

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  owner: string;
  unitPrice: string;
  active: string;
  edit: string;
  delete: string;
}

const productApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: apiDomain,
  }),
  tagTypes: ["products"],
  endpoints(builder) {
    return {
      ProductList: builder.query({
        // query: ({ page, pageSize }) => {
        query: () => {
          return {
            // url: `/api/products/product_list/?page=${
            //   page + 1
            // }&page_size=${pageSize}`,
            url: `/api/products/product_list`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
      ProductListBranch: builder.query({
        query: ({ branch }) => {
          return {
            url: `/api/products/product_list_branch/?branch=${branch}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
      CreateProduct: builder.mutation({
        query: (formBody) => {
          return {
            url: `api/products/create_product/`,
            headers: {
              Authorization: "token " + token,
              // "Content-Type": "application/json",
              // Accept: "/",
            },
            body: formBody,
            method: "POST",
          };
        },
        invalidatesTags: ["products"],
      }),
      ViewProduct: builder.query<Product, string>({
        query: (id) => {
          return {
            url: `/api/products/${id}/view_product`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
      UpdateProduct: builder.mutation({
        query: (formBody) => {
          return {
            url: `api/products/0/update_product/`,
            headers: { Authorization: "token " + token },
            body: formBody,
            method: "POST",
          };
        },
        invalidatesTags: ["products"],
      }),
      CategoryList: builder.query<Category, string>({
        query: () => {
          return {
            url: `/api/products/category_list`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
      DeleteProduct: builder.mutation({
        query: (id) => {
          return {
            url: `/api/products/${id}/delete_product/`,
            headers: { Authorization: "token " + token },
            method: "POST",
          };
        },
        invalidatesTags: ["products"],
      }),
      AddInventory: builder.mutation({
        query: (formBody) => {
          return {
            url: `/api/products/add_inventory/`,
            headers: {
              Authorization: "token " + token,
              // "Content-Type": "application/json",
              // Accept: "/",
            },
            body: formBody,
            method: "POST",
          };
        },
        invalidatesTags: ["products"],
      }),
      InventoryList: builder.query<Product, string>({
        query: () => {
          return {
            url: `/api/products/inventory_list`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
      // /api/products/<product_id>/inventory_list_id
      InventoryListID: builder.query({
        query: (id) => {
          return {
            url: `/api/products/${id}/inventory_list_id`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
      // /api/products/inventory_history/?productID=1
      InventoryHistory: builder.query({
        query: ({ productID }) => {
          return {
            url: `/api/products/inventory_history/?productID=${productID}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
    };
  },
});

export const {
  useProductListQuery,
  useProductListBranchQuery,
  useCreateProductMutation,
  useViewProductQuery,
  useUpdateProductMutation,
  useCategoryListQuery,
  useDeleteProductMutation,
  useAddInventoryMutation,
  useInventoryListQuery,
  useInventoryListIDQuery,
  useInventoryHistoryQuery,
} = productApi;
export { productApi };
