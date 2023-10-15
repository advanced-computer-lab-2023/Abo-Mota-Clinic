import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/admin`,
  }),
  endpoints(builder) {
    return {
      fetchPackages: builder.query({
        providesTags: (result, error) => {
          const tags = result.map((p) => {
            return { type: "Package", id: p._id };
          });
          tags.push({ type: "Package", id: 123 });
          return tags;
        },
        query: () => {
          return {
            url: "/packages",
            method: "GET",
          };
        },
      }),
      updatePackage: builder.mutation({
        invalidatesTags: (result, error, p) => {
          return [{ type: "Package", id: p._id }];
        },
        query: (updated) => {
          return {
            url: `/packages/${updated._id}`,
            body: updated,
            method: "PATCH",
          };
        },
      }),
      addPackage: builder.mutation({
        invalidatesTags: (result, error, p) => {
          return [{ type: "Package", id: 123 }];
        },
        query: (body) => {
          return {
            url: "/packages",
            body,
            method: "POST",
          };
        },
      }),
      deletePackage: builder.mutation({
        invalidatesTags: (result, error, p) => {
          return [{ type: "Package", id: p._id }];
        },
        query: (p) => {
          return {
            url: `/packages/${p._id}`,
            method: "DELETE",
          };
        },
      }),
      fetchApplications : builder.query({
        query : () => {
          return{
            url: "/applications",
            method: "GET",
          };
        },
      }),
      addAdmin : builder.mutation({
        query: (admin)=>{
          return {
            url: '/admins',
            body: admin,
            method: 'POST'
          }
        }
      }),
      removeAdmin : builder.mutation({
        query : (admin)=>{
          return{
            url:'/admins',
            body:admin,
            method: 'DELETE'
          }
        }
      }),
      removePatient : builder.mutation({
        query: (patient)=>{
          return {
            url: '/patients',
            body: patient,
            method: 'DELETE'
          }
        }
      }),
      removeDoctor: builder.mutation({
        query: (doctor)=>{
          return{
            url: '/doctors',
            body: doctor,
            method: 'DELETE'
          }
        }
      })
    };
  },
});

export const {
  useFetchPackagesQuery,
  useFetchApplicationsQuery,
  useUpdatePackageMutation,
  useAddPackageMutation,
  useDeletePackageMutation,
  useAddAdminMutation,
  useRemoveAdminMutation,
  useRemoveDoctorMutation,
  useRemovePatientMutation
} = adminApi;
export { adminApi };
