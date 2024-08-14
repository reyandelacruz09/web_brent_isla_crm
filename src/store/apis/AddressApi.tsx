import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Branch } from "../../components/branch/AddBranch";
const apiDomain = process.env.REACT_APP_API_DOMAIN;
const token = localStorage.getItem("mytoken");

const addressApi = createApi({
  reducerPath: "address",
  baseQuery: fetchBaseQuery({
    baseUrl: apiDomain,
  }),
  tagTypes: ["address"],
  endpoints(builder) {
    return {
      RegionList: builder.query<Branch, string>({
        query: () => {
          return {
            url: `/api/products/region_list`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["address"],
      }),
      ProvinceList: builder.query<Branch, string>({
        query: (regionid) => {
          return {
            url: `/api/products/${regionid}/province_list`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["address"],
      }),
      CityList: builder.query<Branch, string>({
        query: (provinceid) => {
          return {
            url: `/api/products/${provinceid}/city_list`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["address"],
      }),
      BarangayList: builder.query<Branch, string>({
        query: (cityid) => {
          return {
            url: `/api/products/${cityid}/barangay_list`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["address"],
      }),
    };
  },
});

export const {
  useRegionListQuery,
  useProvinceListQuery,
  useCityListQuery,
  useBarangayListQuery,
} = addressApi;
export { addressApi };
