import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/doctor`,
    credentials: "include",
    prepareHeaders: (headers, { getState, endpoint }) => {
      if (endpoint !== "uploadHealthRecord") {
        headers.set("Content-Type", "application/json");
      }
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchDoctor: builder.query({
        providesTags: (result, error) => {
          return [{ type: "Doctor", id: "123" }];
        },
        query: () => {
          return {
            url: "/",
            method: "GET",
          };
        },
      }),
      fetchAppointments: builder.query({
        providesTags: (result, error) => {
          const tags = result.map((appointment) => {
            return { type: "Appointment", id: appointment._id };
          });
          tags.push({ type: "Appointments", id: "all" });
          return tags;
        },
        query: () => {
          return {
            url: "/appointments",
            method: "GET",
          };
        },
      }),
      fetchPatients: builder.query({
        providesTags: (result, error) => {
          console.log("RESULT", result);
          if (result === undefined) {
            result = [];
          }
          const tags = result.map((patient) => {
            return { type: "Patient", id: patient._id };
          });
          tags.push({ type: "DoctorPatient", id: "123" });
          return tags;
        },
        query: () => {
          return {
            url: "/patients",
            // params: {
            //     albumId: album.id,
            // },
            method: "GET",
          };
        },
      }),
      updateDoctor: builder.mutation({
        invalidatesTags: (result, error, doctor) => {
          return [{ type: "Doctor", id: "123" }];
        },
        query: ({ email, rate, affiliation }) => {
          return {
            url: "/",
            body: {
              email,
              rate,
              affiliation,
            },
            method: "PATCH",
          };
        },
      }),
      acceptContract: builder.mutation({
        invalidatesTags: (result, error, doctor) => {
          return [{ type: "Doctor", id: "123" }];
        },
        query: () => {
          return {
            url: "/acceptContract",
            method: "PATCH",
          };
        },
      }),
      scheduleFollowUp: builder.mutation({
        invalidatesTags: (result, error, doctor) => {
          return [{ type: "Doctor", id: "123" }];
        },
        query: ({ patientUsername, followUpDate }) => {
          return {
            url: "/scheduleFollowUp",
            body: {
              patientUsername,
              followUpDate,
            },
            method: "POST",
          };
        },
      }),
      addFreeSlots: builder.mutation({
        invalidatesTags: (result, error, doctor) => {
          return [{ type: "Doctor", id: "123" }];
        },
        query: ({ date, startTime, endTime, appointmentDuration, buffer }) => {
          return {
            url: "/addFreeAppointmentSlots",
            body: {
              date,
              startTime,
              endTime,
              appointmentDuration,
              buffer,
            },
            method: "POST",
          };
        },
      }),

      fetchWalletDoctor: builder.query({
        query: () => {
          return {
            url: "/wallet",
            method: "GET",
          };
        },
      }),
      uploadHealthRecord: builder.mutation({
        invalidatesTags: (result, error, { id }) => {
          return [
            { type: "Doctor", id: "123" },
            { type: "Patient", id: id },
          ];
        },
        query: ({ username, healthRecord }) => {
          const formData = new FormData();
          formData.append("username", username);
          formData.append("healthRecord", healthRecord);
          return {
            url: "/uploadHealthRecord",
            body: formData,
            method: "POST",
          };
        },
      }),
      changeDoctorPassword: builder.mutation({
        query: (data) => {
          return {
            url: "/changePassword",
            method: "PATCH",
            body: data,
          };
        },
      }),
      getAllMedicines: builder.query({
        query: () => {
          return {
            url: "/medicines",
            method: "GET",
          };
        },
      }),
      getFollowUps: builder.query({
        providesTags: (result, error) => {
          const tags = result.map((followUp) => {
            return { type: "FollowUp", id: followUp._id };
          });
          return tags;
        },

        query: () => {
          return {
            url: "/followUps",
            method: "GET",
          };
        },
      }),

      handleFollowUp: builder.mutation({
        invalidatesTags: (result, error, { followUpId }) => {
          return [
            { type: "Appointments", id: "all" },
            { type: "FollowUp", id: followUpId },
          ];
        },
        query: (followUpRequest) => {
          return {
            url: "/handleFollowUp",
            body: followUpRequest,
            method: "POST",
          };
        },
      }),
      rescheduleAppointment: builder.mutation({
        invalidatesTags: (result, error, { appointmentId }) => {
          return [
            // { type: "Appointments", id: "all" },
            { type: "Appointment", id: appointmentId },
          ];
        },
        query: (appointment) => {
          return {
            url: "/rescheduleAppointment",
            body: appointment,
            method: "PATCH",
          };
        },
      }),
      cancelAppointment: builder.mutation({
        invalidatesTags: (result, error, { appointmentId }) => {
          return [
            // { type: "Appointments", id: "all" },
            { type: "Appointment", id: appointmentId },
          ];
        },
        query: (appointment) => {
          return {
            url: "/cancelAppointment",
            body: appointment,
            method: "PATCH",
          };
        },
      }),
      fetchDoctorPrescriptions: builder.query({
        providesTags: (result, error) => {
          const tags = result.map((prescription) => {
            return { type: "Prescription", id: prescription._id };
          });
          tags.push({ type: "Prescriptions", id: "all" });
          return tags;
        },
        query: (patientId) => {
          return {
            url: "/prescriptions",
            method: "GET",
            body: patientId,
          };
        },
      }),
      addMedToPrescription: builder.mutation({
        invalidatesTags: (result, error, { prescriptionId }) => {
          return [{ type: "Prescription", id: prescriptionId }];
        },
        query: (data) => {
          return {
            url: "/addMedToPrescription",
            method: "PATCH",
            body: data,
          };
        },
      }),
      delMedFromPrescription: builder.mutation({
        invalidatesTags: (result, error, { prescriptionId }) => {
          return [{ type: "Prescription", id: prescriptionId }];
        },
        query: (data) => {
          return {
            url: "/delMedFromPrescription",
            method: "PATCH",
            body: data,
          };
        },
      }),
      updateMedInPrescription: builder.mutation({
        invalidatesTags: (result, error, { prescriptionId }) => {
          return [{ type: "Prescription", id: prescriptionId }];
        },
        query: (data) => {
          return {
            url: "/updateMedInPrescription",
            method: "PATCH",
            body: data,
          };
        },
      }),
      addPrescription: builder.mutation({
        invalidatesTags: (result, error) => {
          return [{ type: "Prescriptions", id: "all" }];
        },
        query: (data) => {
          return {
            url: "/addPrescription",
            method: "POST",
            body: data,
          };
        },
      }),
      updateDescription: builder.mutation({
        invalidatesTags: (result, error, { prescriptionId }) => {
          return [{ type: "Prescription", id: prescriptionId }];
        },
        query: (data) => {
          return {
            url: "/updateDescription",
            method: "PATCH",
            body: data,
          };
        },
      }),
    };
  },
});

export const {
  useFetchDoctorQuery,
  useFetchPatientsQuery,
  useFetchAppointmentsQuery,
  useUpdateDoctorMutation,
  useAcceptContractMutation,
  useScheduleFollowUpMutation,
  useAddFreeSlotsMutation,
  useFetchWalletDoctorQuery,
  useUploadHealthRecordMutation,
  useChangeDoctorPasswordMutation,
  useGetAllMedicinesQuery,
  useGetFollowUpsQuery,
  useHandleFollowUpMutation,
  useRescheduleAppointmentMutation,
  useCancelAppointmentMutation,
  useFetchDoctorPrescriptionsQuery,
  useAddMedToPrescriptionMutation,
  useDelMedFromPrescriptionMutation,
  useUpdateMedInPrescriptionMutation,
  useAddPrescriptionMutation,
  useUpdateDescriptionMutation,
} = doctorApi;
export { doctorApi };
