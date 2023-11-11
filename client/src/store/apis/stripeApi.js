import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const stripeApi = createApi({
  reducerPath: "stripe",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/stripe",
    fetchFn: async (...args) => {
      return fetch(...args, { credentials: "include" });
    },
  }),

  endpoints: (builder) => {
    return {
      fetchStripeConfig: builder.query({
        providesTags: (result, error) => {
          return ["StripeConfig"];
        },

        query: () => {
          return {
            url: "/config",
            method: "GET",
          };
        },
      }),

      createPaymentIntent: builder.mutation({
        providesTags: (result, error) => {
          return ["PaymentIntent"];
        },

        query: (amount) => {
          return {
            url: "/create-payment-intent",
            method: "POST",
            body: { amount },
          };
        },
      }),
    };
  },
});

export const { useCreatePaymentIntentMutation, useFetchStripeConfigQuery } = stripeApi;

export { stripeApi };
