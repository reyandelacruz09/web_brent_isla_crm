import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productApi } from "../store/apis/ProductsApi";
import { clientApi } from "../store/apis/ClientsApi";
import { addressApi } from "../store/apis/AddressApi";
import { branchApi } from "../store/apis/BranchApi";
import { orderApi } from "../store/apis/OrderApi";
import { userApi } from "../store/apis/UserApi";
// import { productApi } from "./apis/ProductsApi";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
    [branchApi.reducerPath]: branchApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(clientApi.middleware)
      .concat(addressApi.middleware)
      .concat(branchApi.middleware)
      .concat(orderApi.middleware)
      .concat(userApi.middleware);
  },
});

setupListeners(store.dispatch);
export {
  useProductListQuery,
  useCreateProductMutation,
  useViewProductQuery,
  useUpdateProductMutation,
  useCategoryListQuery,
  useDeleteProductMutation,
  useAddInventoryMutation,
  useInventoryListQuery,
  useInventoryListIDQuery,
} from "../store/apis/ProductsApi";

export {
  useClientListQuery,
  useCreateClientMutation,
  useClientCategoryListQuery,
  useViewClientQuery,
  useUpdateClientMutation,
  useDeleteClientMutation,
} from "../store/apis/ClientsApi";
export {
  useRegionListQuery,
  useProvinceListQuery,
  useCityListQuery,
  useBarangayListQuery,
} from "../store/apis/AddressApi";
export {
  useBranchListQuery,
  useCreateBranchMutation,
  useViewBranchQuery,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
} from "../store/apis/BranchApi";
export {
  useCreateOrderMutation,
  useOrderListQuery,
  useOrderListCustomerQuery,
  useOrderCustomerDetailsQuery,
} from "../store/apis/OrderApi";
export {
  useCreateUserMutation,
  useUserListQuery,
  useViewUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../store/apis/UserApi";
