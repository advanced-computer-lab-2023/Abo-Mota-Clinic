import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { doctorApi } from './apis/doctorApi';
import { doctorReducer, getDoctors } from './slices/doctorSlice';
import { adminApi } from './apis/adminApi';
import { guestApi } from './apis/guestApi';
export const store = configureStore({
  reducer: {
    [doctorApi.reducerPath]: doctorApi.reducer,
    doctorSlice: doctorReducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [guestApi.reducerPath]: guestApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
    .concat(doctorApi.middleware)
    .concat(adminApi.middleware)
    .concat(guestApi.middleware)
  },
});

setupListeners(store.dispatch);


export {
    useFetchAppointmentsQuery,
    useFetchPatientsQuery,
    useFetchDoctorQuery,
    useUpdateDoctorMutation
} from './apis/doctorApi';

export{
  useAddPackageMutation,
  useDeletePackageMutation,
  useFetchPackagesQuery,
  useUpdatePackageMutation,
  useFetchApplicationsQuery,
  useAddAdminMutation,
  useRemoveAdminMutation,
  useRemovePatientMutation,
  useRemoveDoctorMutation
} from './apis/adminApi'

export{
  useRegisterDoctorMutation,
  useRegisterPatientMutation
} from './apis/guestApi'

export {
    getDoctors
}