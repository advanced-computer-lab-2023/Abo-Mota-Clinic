import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const patientApi = createApi({
  reducerPath: "patientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/patient`,
    credentials: "include",
    prepareHeaders: (headers, { getState, endpoint }) => {
      if (endpoint !== "uploadMedicalHistory") {
        headers.set("Content-Type", "application/json");
      }
      return headers;
    },
  }),

  endpoints: (builder) => {
    return {
      fetchPatient: builder.query({
        providesTags: (result, error) => {
          return ["my info"];
        },
        query: () => {
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

      deleteMedicalHistory: builder.mutation({
        query: ({ fileName }) => {
          return {
            url: `/deleteMedicalHistory/${fileName}`,
            method: "DELETE",
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
        providesTags: (result, error) => {
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

      fetchMyPackage: builder.query({
        providesTags: (result, error, data) => {
          return ["My package"];
        },
        query: () => {
          return {
            url: "/myPackage",
            method: "GET",
          };
        },
      }),
      fetchFamilyPackage: builder.query({
        providesTags: (result, error, data) => {
          const tags = result.map((pack) => {
            return { username: pack.username };
          });
          return tags;
        },
        query: () => {
          return {
            url: "/familyPackages",
            method: "GET",
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
      cancelMyPackage: builder.mutation({
        invalidatesTags: (result, error, data) => {
          return ["My package"];
        },
        query: () => {
          return {
            url: "/cancelMySub",
            method: "POST",
          };
        },
      }),

      cancelMyFamilyPackage: builder.mutation({
        invalidatesTags: (result, error, { familyMemberUsername }) => {
          return [{ username: familyMemberUsername }];
        },
        query: (data) => {
          return {
            url: "/cancelFamilySub",
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
          };
        },
      }),

      uploadMedicalHistory: builder.mutation({
        invalidatesTags: (result, error, data) => {
          return ["my info"];
        },
        query: ({ medicalHistory }) => {
          const formData = new FormData();
          formData.append("medicalHistory", medicalHistory);
          return {
            url: "/uploadMedicalHistory",
            body: formData,
            method: "POST",
          };
        },
      }),
      subscribeToHealthPackage: builder.mutation({
        query: (data) => {
          return {
            url: "/subscribe",
            method: "POST",
            body: data,
          };
        },
      }),

      removeDocument: builder.mutation({
        invalidatesTags: (result, error, data) => {
          return ["my info"];
        },
        query: ({ _id }) => {
          return {
            url: `/deleteMedicalHistory/${_id}`,
            method: "PATCH",
          };
        },
      }),

      linkFamilyMember: builder.mutation({
        invalidatesTags: (result, error, data) => {
          return [
            "my info",
            {
              type: "patientId",
              value: data.patientId,
            },
          ];
        },
        query: (data) => {
          return {
            url: "/linkFamily",
            method: "POST",
            body: data,
          };
        },
      }),

      changePatientPassword: builder.mutation({
        query: (data) => {
          return {
            url: "/changePassword",
            method: "PATCH",
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
  useFetchMyPackageQuery,
  useFetchFamilyPackageQuery,
  useBookAppointmentMutation,
  useCancelMyPackageMutation,
  useCancelMyFamilyPackageMutation,
  useRemoveDocumentMutation,
  useLinkFamilyMemberMutation,
  useFetchWalletPatientQuery,
  useChangePatientPasswordMutation,
} = patientApi;

export { patientApi };
