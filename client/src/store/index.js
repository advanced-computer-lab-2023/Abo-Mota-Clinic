import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { doctorApi } from "./apis/doctorApi";
import { adminApi } from "./apis/adminApi";
import { guestApi } from "./apis/guestApi";
import { patientApi } from "./apis/patientApi";
import { stripeApi } from "./apis/stripeApi";
import { commonApi } from "./apis/commonApi";
import { userReducer } from "./slices/userSlice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["isAuthenticatedClinic", "userRoleClinic"],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [guestApi.reducerPath]: guestApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
    [stripeApi.reducerPath]: stripeApi.reducer,
    [commonApi.reducerPath]: commonApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(doctorApi.middleware)
      .concat(adminApi.middleware)
      .concat(guestApi.middleware)
      .concat(patientApi.middleware)
      .concat(stripeApi.middleware)
      .concat(commonApi.middleware);
  },
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
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
  useChangeDoctorPasswordMutation
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
  useChangeAdminPasswordMutation
} from "./apis/adminApi";

export {
  useRegisterDoctorMutation,
  useRegisterPatientMutation,
  useLoginMutation,
  useLogoutMutation,
  useForgetPasswordMutation,
  useRequestOtpMutation,
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
  usePayByWalletMutation,
  useFetchMyPackageQuery,
  useFetchFamilyPackageQuery,
  useBookAppointmentMutation,
  useCancelMyPackageMutation,
  useFetchWalletPatientQuery,
  useSubscribeToHealthPackageMutation,
  useCancelMyFamilyPackageMutation,
  useUploadMedicalHistoryMutation,
  useRemoveDocumentMutation,
  useLinkFamilyMemberMutation,
  useChangePatientPasswordMutation,
} = patientApi;

export const {
  useCreatePaymentIntentMutation,
  useFetchStripeConfigQuery
} = stripeApi;

export const {
  useFetchLoggedInQuery,
  useSendMessageMutation,
  useFetchMessagesQuery,
  useFetchUserQuery,
} = commonApi;

export { logout, login } from "./slices/userSlice";
