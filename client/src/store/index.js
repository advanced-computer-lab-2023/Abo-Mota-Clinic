import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { doctorApi } from "./apis/doctorApi";
import { adminApi } from "./apis/adminApi";
import { guestApi } from "./apis/guestApi";
import { patientApi } from "./apis/patientApi";
import { stripeApi } from "./apis/stripeApi";

export const store = configureStore({
  reducer: {
    
    [doctorApi.reducerPath]: doctorApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [guestApi.reducerPath]: guestApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
    [stripeApi.reducerPath]: stripeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(doctorApi.middleware)
      .concat(adminApi.middleware)
      .concat(guestApi.middleware)
      .concat(patientApi.middleware)
      .concat(stripeApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  useFetchAppointmentsQuery,
  useFetchPatientsQuery,
  useFetchDoctorQuery,
  useUpdateDoctorMutation,
  useAcceptContractMutation,
  useScheduleFollowUpMutation,
  useAddFreeSlotsMutation,
  useFetchWalletDoctorQuery,
  useUploadHealthRecordMutation,
} from "./apis/doctorApi";

export {
  useAddPackageMutation,
  useDeletePackageMutation,
  useFetchPackagesQuery,
  useUpdatePackageMutation,
  useFetchApplicationsQuery,
  useAddAdminMutation,
  useRemoveAdminMutation,
  useRemovePatientMutation,
  useRemoveDoctorMutation,
  useHandleApplicationMutation,
} from "./apis/adminApi";

export {
  useRegisterDoctorMutation,
  useRegisterPatientMutation,
  useLoginMutation,
  useLogoutMutation,
} from "./apis/guestApi";

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
  useCancelMyPackageMutation,
  usePayByWalletMutation,
  useFetchWalletPatientQuery,
  useSubscribeToHealthPackageMutation,
  useCancelMyFamilyPackageMutation,
  useUploadMedicalHistoryMutation,
  useRemoveDocumentMutation
} = patientApi;

export const { useCreatePaymentIntentMutation, useFetchStripeConfigQuery } = stripeApi;
