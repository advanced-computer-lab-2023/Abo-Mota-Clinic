import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const doctorApi = createApi({
    reducerPath: 'doctorApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_URL}/api/doctor`,
    }),
    endpoints(builder){
       return {
        fetchDoctor: builder.query({
            providesTags: (result, error)=>{
                return [{type: 'Doctor', id: result.id}];
            },
            query: () => {
                return {
                    url: '/',
                    method: 'GET'
                }
            }
        }),
        fetchAppointments: builder.query({
            providesTags:(result,error,doctor)=>{
                const tags = result.map((appointment)=>{
                    return {type:'Appointment', id:appointment._id}
                });
                tags.push({type:'DoctorAppointment',id:doctor._id})
                return tags;
            },
            query : (doctor) => {
                return {
                    url: '/appointments',
                    // params: {
                    //     albumId: album.id, 
                    // },
                    method: 'GET'
                }
            }
        }),
        fetchPatients: builder.query({
            providesTags:(result,error,doctor)=>{
                const tags = result.map((patient)=>{
                    return {type:'Patient', id:patient._id}
                });
                tags.push({type:'DoctorPatient',id:doctor._id})
                return tags;
            },
            query : (doctor) => {
                return {
                    url: '/patients',
                    // params: {
                    //     albumId: album.id, 
                    // },
                    method: 'GET'
                }
            }
        }),
        updateDoctor: builder.mutation({
            invalidatesTags : (result, error, doctor)=>{
                return [{type:'Doctor', id:doctor.id}];
            },
            query : ({ email , rate, affiliation })=>{
                return {
                    url: '/',
                    body: {
                        email,
                        rate,
                        affiliation 
                    },
                    method :'PATCH' 
                }
            }
        },
        
        )
       } 
    }
})

export const {
    useFetchDoctorQuery,
    useFetchPatientsQuery,
    useFetchAppointmentsQuery,
    useUpdateDoctorMutation,
} = doctorApi;
export { doctorApi };