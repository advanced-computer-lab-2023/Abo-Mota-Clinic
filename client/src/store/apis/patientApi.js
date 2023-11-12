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
      return fetch(...args, { credentials: "include" });
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

      uploadMedicalHistory: builder.mutation({
        query: ({ medicalHistory }) => {
          const formData = new FormData();
          formData.append("medicalHistory", medicalHistory);
          return {
            url: "/uploadMedicalHistory",
            method: "POST",
            body: formData,
          };
        },
      }),

      deleteMedicalHistory: builder.mutation({
        query: ({fileName}) => {
          return {
            url: `/deleteMedicalHistory/${fileName}`,
            method: "DELETE"
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

      fetchAvailableAppointments: builder.query({
        query: (doctorId) => {
          return {
            url: "/availableAppointments",
            params: {
              doctorId,
            },
            method: "GET",
          };
        },
      }),

      creditDoctor: builder.mutation({
        query: (data) => {
          return {
            url: "/creditDoctor",
            method: "PATCH",
            body: data,
          };
        },
      }),

      payByWallet: builder.mutation({
        query: (data) => {
          return {
            url: "/payWallet",
            method: "PATCH",
            body: data,
          };
        },
      }),

      bookAppointment: builder.mutation({
        query: (data) => {
          return {
            url: "/bookAppointment",
            method: "POST",
            body: data,
          };
        },
      }),

      fetchWalletPatient: builder.query({
        query: () => {
          return {
            url: "/wallet",
            method: "GET",
          }
        }
      }),
      subscribeToHealthPackage: builder.mutation({
        query: (data) => {
          return {
            url: "/subscribeToHealthPackage",
            method: "POST",
            body: data,
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
  useUploadMedicalHistoryMutation,
  useDeleteMedicalHistoryMutation,
  useFetchPrescriptionsQuery,
  useFetchDoctorsQuery,
  useFetchPackagesPatientQuery,
  useFetchAvailableAppointmentsQuery,
  useCreditDoctorMutation,
  usePayByWalletMutation,
  useBookAppointmentMutation,
  useFetchWalletPatientQuery,
  useSubscribeToHealthPackageMutation,
} = patientApi;

export { patientApi };
