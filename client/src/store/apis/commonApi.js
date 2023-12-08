import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const commonApi = createApi({
  reducerPath: "commonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/common`,
    credentials: 'include'
  }),

  endpoints(builder) {
    return {
      fetchLoggedIn: builder.query({
        // providesTags: (result, error) => {
        //   const tags = result.map((p) => {
        //     return { type: "Package", id: p._id };
        //   });
        //   tags.push({ type: "Package", id: 123 });
        //   return tags;
        // },

        query: () => {
          return {
            url: "/loggedIn",
            method: "GET",
          };
        },
      }),

      sendMessage: builder.mutation({
        // invalidatesTags: (result, error, p) => {
        //   return [{ type: "Package", id: p._id }];
        // },
        query: (data) => {
          return {
            url: "/message",
            body: data,
            method: "POST",
          };
        },
      }),

      fetchMessages: builder.query({
        // providesTags: (result, error) => {
        //   const tags = result.map((p) => {
        //     return { type: "Package", id: p._id };
        //   });
        //   tags.push({ type: "Package", id: 123 });
        //   return tags;
        // },

        query: (recipient) => {
          return {
            url: `/message?recipient=${recipient}`,
            method: "GET",
          };
        },
      }),

      fetchRecipient: builder.query({
        query: (recipientId) => {
          return {
            url: `/recipient?recipientId=${recipientId}`,
            method: "GET",
          };
        },
      }),

      fetchContacts: builder.query({
        query: () => {
          return {
            url: `/contacts`,
            method: "GET",
          };
        },
      }),
    }
  },
});

export const {
  useFetchLoggedInQuery,
  useSendMessageMutation,
  useFetchMessagesQuery,
  useFetchRecipientQuery,
  useFetchContactsQuery,
} = commonApi;

export { commonApi };
