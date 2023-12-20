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

        query: (data) => {
          return {
            url: "/message",
            body: data,
            method: "POST",
          };
        },
      }),

      fetchMessages: builder.query({
        providesTags: (result, error, contact) => {
          return ["messages"];
        },

        query: (contact) => {
          return {
            url: `/message?contact=${contact}`,
            method: "GET",
          };
        },
      }),

      fetchContact: builder.query({
        query: (contact) => {
          return {
            url: `/contact?contact=${contact}`,
            method: "GET",
          };
        },
      }),

      fetchContactsDetails: builder.query({
        providesTags: (result, error, contactIds) => {
          return ["contactsDetails"];
        },

        query: () => {
          return {
            url: `/contacts`,
            method: "GET",
          };
        },
      }),

      sendNotification: builder.mutation({
        invalidatesTags:(result, error, p)=>{
          return ["notification"];
        },
        query: (data) => {
          return {
            url: "/notification",
            body: data,
            method: "POST",
          };
        },
      }),

      fetchNotification: builder.query({
        providesTags:(result, error, contactIds)=>{
          return ["notification"]
        },
        query: () => {
          return {
            url: "/notifications",
            method: "GET",
          };
        },
      }),

      sendEmail: builder.mutation({
        query: (data) => {
          return {
            url: "/send-email",
            body: data,
            method: "POST",
          };
        },
      }),

      invalidateMessages: builder.mutation({
        invalidatesTags: (result, error, p) => {
          return ["messages"];
        },

        query: (data) => {
          return {
            url: "/nil",
            method: "POST",
          };
        },
      }),

      fetchUser: builder.query({
        query: (id) => {
          return {
            url: `/user?id=${id}`,
            method: "GET",
          };
        },
      }),

      readMessage: builder.mutation({
        query: (data) => {
          return {
            url: "/readMessage",
            body: data,
            method: "POST",
          };
        }
      }),

    }
  },
});

export const {
  useFetchLoggedInQuery,
  useSendMessageMutation,
  useFetchMessagesQuery,
  useFetchRecipientQuery,
  useFetchContactsDetailsQuery,
  useSendNotificationMutation,
  useFetchNotificationQuery,
  useSendEmailMutation,
  useInvalidateMessagesMutation,
  useFetchUserQuery,
  useReadMessageMutation,
} = commonApi;

export { commonApi };
