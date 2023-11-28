import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const serviceWorkerApi = createApi({
  reducerPath: "serviceWorker",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/serviceWorker",
    fetchFn: async (...args) => {
      return fetch(...args, { credentials: "include" });
    },
  }),

  endpoints: (builder) => {
    return {

      createSubscription: builder.mutation({
        providesTags: (result, error) => {
          return ["DKWTFISTHIS"];
        },

        query: (data) => {
          return {
            url: "/subscribe",
            method: "POST",
            body: data,
          };
        },
      }),
    };
  },
});

export const { useCreateSubscriptionMutation } = serviceWorkerApi;

export { serviceWorkerApi };
