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

        query: (data) => {
          return {
            url: `/message?recipient=${data.recipient}`,
            method: "GET",
          };
        },
      }),

      sendNotification: builder.mutation({
    
        query: (data) => {
          return {
            url: "/notification",
            body: data,
            method: "POST",
          };
        },
      }),

      fetchNotification: builder.query({

        query: () => {
          return {
            url: "/notifications",
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
  useSendNotificationMutation,
  useFetchNotificationQuery,
} = commonApi;

export { commonApi };
