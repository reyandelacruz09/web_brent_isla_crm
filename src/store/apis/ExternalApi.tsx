import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const externalApi = createApi({
  reducerPath: "external",
  baseQuery: fetchBaseQuery(),
  endpoints(builder) {
    return {
      sendComplaint: builder.mutation({
        query: (formBody) => {
          return {
            url: `https://flow.zoho.com/772396954/flow/webhook/incoming?zapikey=1001.2768223215be0fcafdcfbadcbadd93e5.35f2633c889af89b756ed315cf7b2d29&isdebug=false`,
            method: "POST",
            body: formBody,
          };
        },
      }),
    };
  },
});

export const { useSendComplaintMutation } = externalApi;
export { externalApi };
