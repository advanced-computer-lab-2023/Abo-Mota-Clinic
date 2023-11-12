import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const patientApi = createApi({
  reducerPath: "patientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/patient`,
    credentials: "include",
    prepareHeaders: (headers, { getState, endpoint }) => {
      if (endpoint !== "uploadMedicalHistory" ) {
        headers.set("Content-Type", "application/json");
      }
      return headers;
    },
  }),

  endpoints: (builder) => {
    return {
      fetchPatient: builder.query({
        providesTags:(result, error, id)=>{
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

      payAppointmentByWallet: builder.mutation({
        query: (data) => {
          return {
            url: "/payWallet",
            method: "PATCH",
            body: data,
          };
        },
      }),

      fetchMyPackage: builder.query({
        providesTags:(result, error, data)=>{
            return ["My package"];
        }
        ,
        query:()=>{
          return {
            url:'/myPackage',
            method:"GET",
          }
        }
      }),
      fetchFamilyPackage: builder.query({
        providesTags:(result, error, data)=>{
            return ["Family packages"];
        },
        query:()=>{
          return{
            url:'/familyPackages',
            method:"GET",
          }
        }
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
        query: (data)=>{
          return {
            url:'/cancelMySub',
            method:"POST"
          }
        }
      }),

      uploadMedicalHistory: builder.mutation({
        invalidatesTags: (result, error, { id }) => {
          return [
            "my info"
          ];
        },
        query: ({ username, healthRecord }) => {
          const formData = new FormData();
          formData.append("username", username);
          formData.append("medicalHistory", healthRecord);
          return {
            url: "/uploadHealthRecord",
            body: formData,
            method: "POST"
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
  useFetchAvailableAppointmentsQuery,
  useCreditDoctorMutation,
  usePayAppointmentByWalletMutation,
  useFetchMyPackageQuery,
  useFetchFamilyPackageQuery,
  useBookAppointmentMutation,
  useCancelMyPackageMutation
} = patientApi;

export { patientApi };
