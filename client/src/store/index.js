import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { doctorApi } from './apis/doctorApi';
import { doctorReducer, getDoctors } from './slices/doctorSlice';

export const store = configureStore({
  reducer: {
    [doctorApi.reducerPath]: doctorApi.reducer,
    doctorSlice: doctorReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
    .concat(doctorApi.middleware)
  },
});

setupListeners(store.dispatch);


export {
    useFetchAppointmentsQuery,
    useFetchPatientsQuery,
    useFetchDoctorQuery,
    useUpdateDoctorMutation
} from './apis/doctorApi';

export {
    getDoctors
}