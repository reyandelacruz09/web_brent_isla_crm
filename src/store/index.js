import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productApi } from "../store/apis/ProductsApi";
import { clientApi } from "../store/apis/ClientsApi";
// import { productApi } from "./apis/ProductsApi";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(clientApi.middleware);
  },
});

setupListeners(store.dispatch);
export {
  useProductListQuery,
  useCreateProductMutation,
  useViewProductQuery,
  useUpdateProductMutation,
} from "../store/apis/ProductsApi";

export { useClientListQuery } from "../store/apis/ClientsApi";
