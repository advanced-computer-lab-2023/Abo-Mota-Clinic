import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
};

const patientApi = createApi({
  reducerPath: "patient",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/patient",
    fetchFn: async (...args) => {
      await pause(2000);
      return fetch(...args);
    },
  }),

  endpoints: (builder) => {
    return {
      fetchPatient: builder.query({
        query: (id) => {
          return {
            url: "/",
            method: "GET",
          };
        },
      }),

      fetchPatientAppointments: builder.query({
        query: (patient_id) => {
          return {
            url: "/appointments/",
            params: {
              patient_id,
            },
            method: "GET",
          };
        },
      }),

      fetchFamilyMembers: builder.query({
        providesTags: (result, error, patientId) => {
          return [
            {
              type: "patientId",
              value: patientId,
            },
          ];
        },

        query: (id) => {
          return {
            url: "/family/",
            params: {
              patientId: id,
            },
            method: "GET",
          };
        },
      }),

      addFamilyMember: builder.mutation({
        invalidatesTags: (result, error, data) => {
          // console.log("Invalidating tag: ", { type: "patientId", id: data.patientId });
          // return [{ type: "patientId", id: data.patientId }];
          return [
            {
              type: "patientId",
              value: data.patientId,
            },
          ];
        },

        query: (data) => {
          return {
            url: "/family/",
            method: "POST",
            body: data,
          };
        },
      }),

      fetchPrescriptions: builder.query({
        query: (patientId) => {
          return {
            url: "/prescriptions/",
            params: {
              patientId,
            },
            method: "GET",
          };
        },
      }),

      fetchDoctors: builder.query({
        providesTags: (result, error, patientId) => {
          return ["Doctors"];
        },

        query: () => {
          return {
            url: "/doctors",
            method: "GET",
          };
        },
      }),
      fetchPackagesPatient: builder.query({
        query: (patientId) => {
          return {
            url: "/packages",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useFetchPatientQuery,
  useFetchPatientAppointmentsQuery,
  useFetchFamilyMembersQuery,
  useAddFamilyMemberMutation,
  useFetchPrescriptionsQuery,
  useFetchDoctorsQuery,
  useFetchPackagesPatientQuery,
} = patientApi;

export { patientApi };
