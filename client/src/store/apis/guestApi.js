import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const guestApi = createApi({
  reducerPath: "guestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/guest`,
    credentials: "include",
  }),
  endpoints(builder) {
    return {
      registerDoctor: builder.mutation({
        query: (doctor) => {
          return {
            url: "/registerDoctor",
            body: doctor,
            method: "POST",
          };
        },
      }),
      registerPatient: builder.mutation({
        query: (patient) => {
          return {
            url: "/registerPatient",
            body: patient,
            method: "POST",
          };
        },
      }),
      login: builder.mutation({
        query: (user) => {
          return {
            url: "/login",
            body: user,
            method: "POST",
          };
        },
      }),

      logout: builder.mutation({
        query: () => {
          return {
            url: "/logout",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useRegisterDoctorMutation, useRegisterPatientMutation, useLoginMutation, useLogoutMutation } = guestApi;
export { guestApi };
