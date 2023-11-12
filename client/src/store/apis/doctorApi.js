import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const doctorApi = createApi({
    reducerPath: 'doctorApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_URL}/api/doctor`,
        credentials: "include"
    }),
    endpoints(builder){
       return {
        fetchDoctor: builder.query({
            providesTags: (result, error)=>{
                return [{type: 'Doctor', id: "123"}];
            },
            query: () => {
                return {
                    url: '/',
                    method: 'GET',
                }
            }
        }),
        fetchAppointments: builder.query({
            providesTags:(result,error)=>{
                const tags = result.map((appointment)=>{
                    return {type:'Appointment', id:appointment._id}
                });
                // tags.push({type:'DoctorAppointment',id:doctor._id})
                return tags;
            },
            query : () => {
                return {
                    url: '/appointments',
                    method: 'GET',
                }
            }
        }),
        fetchPatients: builder.query({
            providesTags:(result,error)=>{
                console.log("RESULT", result)
                const tags = result.map((patient)=>{
                    return {type:'Patient', id:patient._id}
                });
                tags.push({type:'DoctorPatient',id:"123"})
                return tags;
            },
            query : () => {
                return {
                    url: '/patients',
                    // params: {
                    //     albumId: album.id, 
                    // },
                    method: 'GET',

                }
            }
        }),
        updateDoctor: builder.mutation({
            invalidatesTags : (result, error, doctor)=>{
                return [{type:'Doctor', id:"123"}];
            },
            query : ({ email , rate, affiliation })=>{
                return {
                    url: '/',
                    body: {
                        email,
                        rate,
                        affiliation 
                    },
                    method :'PATCH',

                }
            }
        }),
        acceptContract: builder.mutation({
            invalidatesTags : (result, error, doctor)=>{
                return [{type:'Doctor', id:"123"}];
            },
            query : ()=>{
                return {
                    url: '/acceptContract',
                    method :'PATCH',
                }
            }
        }),
        scheduleFollowUp: builder.mutation({
            invalidatesTags : (result, error, doctor)=>{
                return [{type:'Doctor', id:"123"}];
            },
            query : ({patientUsername, followUpDate})=>{
                return {
                    url: '/scheduleFollowUp',
                    body: {
                        patientUsername,
                        followUpDate
                    },
                    method :'POST',
                }
            }
        }),
        addFreeSlots: builder.mutation({
            invalidatesTags : (result, error, doctor)=>{
                return [{type:'Doctor', id:"123"}];
            },
            query : ({date, startTime, endTime, appointmentDuration, buffer})=>{
                return {
                    url: '/addFreeAppointmentSlots',
                    body: {
                        date,
                        startTime,
                        endTime,
                        appointmentDuration,
                        buffer
                    },
                    method :'POST',
                }
            }
        }),

        fetchWalletDoctor: builder.query({
            query: () => {
              return {
                url: "/wallet",
                method: "GET",
              };
            },
        }),
       } 
    }
})

export const {
    useFetchDoctorQuery,
    useFetchPatientsQuery,
    useFetchAppointmentsQuery,
    useUpdateDoctorMutation,
    useAcceptContractMutation,
    useScheduleFollowUpMutation,
    useAddFreeSlotsMutation,
    useFetchWalletDoctorQuery
} = doctorApi;
export { doctorApi };