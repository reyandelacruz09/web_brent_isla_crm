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
  endpoints(builder) {
    return {
      ProductList: builder.query<Product, string>({
        query: () => {
          return {
            url: `/api/products/product_list`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
      }),
      CreateProduct: builder.mutation({
        query: (formBody) => {
          return {
            url: `api/products/create_product/`,
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
      ViewProduct: builder.query<Product, string>({
        query: (id) => {
          return {
            url: `/api/products/${id}/view_product`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
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
      }),
      CategoryList: builder.query<Category, string>({
        query: () => {
          return {
            url: `/api/products/category_list`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
      }),
      DeleteProduct: builder.mutation({
        query: (id) => {
          return {
            url: `/api/products/${id}/delete_product/`,
            headers: { Authorization: "token " + token },
            method: "POST",
          };
        },
      }),
    };
  },
});

export const {
  useProductListQuery,
  useCreateProductMutation,
  useViewProductQuery,
  useUpdateProductMutation,
  useCategoryListQuery,
  useDeleteProductMutation,
} = productApi;
export { productApi };
