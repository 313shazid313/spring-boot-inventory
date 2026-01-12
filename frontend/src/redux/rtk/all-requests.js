import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseUrl = "http://localhost:8080";

const allApi = createApi({
  reducerPath: "allApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BaseUrl}`,
    credentials: "include",
  }),

  tagTypes: ["All"],

  endpoints: (builder) => ({
    createEmployee: builder.mutation({
      query: (data) => ({
        url: "/api/v1/employees",
        method: "POST",
        body: data,
      }),
      providesTags: ["All"],
    }),

    getEmployees: builder.query({
      query: () => ({
        url: "/api/v1/employees",
        method: "GET",
      }),
      providesTags: ["All"],
    }),

    updateEmployee: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/v1/employees/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["All"],
    }),

    singleEmployee: builder.query({
      query: (id) => `/api/v1/employees/${id}`,
      providesTags: ["All"],
    }),

    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/delete-employee/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["All"],
    }),

    searchEmployee: builder.query({
      query: (searchedname) => `/searched-employees?query=${searchedname}`,
      providesTags: ["All"],
    }),

    countEmployees: builder.query({
      query: () => `/count-employees`,
      providesTags: ["All"],
    }),

    assignedJob: builder.mutation({
      query: (id) => ({
        url: `/assigned-job/${id}`,
        method: "PATCH",
      }),
      providesTags: ["All"],
    }),

    loginAdmin: builder.mutation({
      query: (data) => ({
        url: "/api/auth/login",
        method: "POST",
        body: data,
      }),
      providesTags: ["All"],
    }),

    createLeave: builder.mutation({
      query: (data) => ({
        url: "/create-leave",
        method: "POST",
        body: data,
      }),
      providesTags: ["All"],
    }),

    readLeave: builder.query({
      query: () => ({
        url: "/get-leave",
        method: "GET",
      }),
      providesTags: ["All"],
    }),

    updateLeave: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/update-leave/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["All"],
    }),

    deleteLeave: builder.mutation({
      query: (id) => ({
        url: `/delete-leave/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["All"],
    }),

    singleLeave: builder.query({
      query: (id) => `/single-leave/${id}`,
      providesTags: ["All"],
    }),

    approved: builder.mutation({
      query: (data) => ({
        url: `/approved/${data}`,
        method: "PATCH",
      }),
      invalidatesTags: ["All"],
    }),

    rejected: builder.mutation({
      query: (data) => ({
        url: `/rejected/${data}`,
        method: "PATCH",
      }),
      invalidatesTags: ["All"],
    }),

    allLeaveWilhSpecficId: builder.query({
      query: (id) => `/leave-with-id/${id}`,
      providesTags: ["All"],
    }),

    createJob: builder.mutation({
      query: (data) => ({
        url: "/create-job",
        method: "POST",
        body: data,
      }),
      providesTags: ["All"],
    }),

    readJob: builder.query({
      query: () => ({
        url: "/get-job",
        method: "GET",
      }),
      providesTags: ["All"],
    }),

    updateJob: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/update-job/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["All"],
    }),

    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/delete-job/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["All"],
    }),

    singleJob: builder.query({
      query: (id) => `/single-job/${id}`,
      providesTags: ["All"],
    }),

    createDepartment: builder.mutation({
      query: (data) => ({
        url: "/create-department",
        method: "POST",
        body: data,
      }),
      providesTags: ["All"],
    }),

    readDepartment: builder.query({
      query: () => ({
        url: "/get-department",
        method: "GET",
      }),
      providesTags: ["All"],
    }),

    updateDepartment: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-department/${id}`,
        method: "PUT",
        body: status,
      }),
      invalidatesTags: ["All"],
    }),

    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `/delete-department/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["All"],
    }),

    singleDepartment: builder.query({
      query: (id) => `/single-department/${id}`,
      providesTags: ["All"],
    }),

    countDepartment: builder.query({
      query: () => `/count-department`,
      providesTags: ["All"],
    }),

    createPayroll: builder.mutation({
      query: (data) => ({
        url: "/create-payroll",
        method: "POST",
        body: data,
      }),
      providesTags: ["All"],
    }),

    getPayroll: builder.query({
      query: () => ({
        url: "/get-payroll",
        method: "GET",
      }),
      providesTags: ["All"],
    }),

    deletePayroll: builder.mutation({
      query: (id) => ({
        url: `/delete-payroll/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["All"],
    }),

    paidSalary: builder.mutation({
      query: (data) => ({
        url: `/paid-salary/${data}`,
        method: "PATCH",
      }),
      invalidatesTags: ["All"],
    }),

    chartData: builder.query({
      query: () => ({
        url: "/get-chart-data",
        method: "GET",
      }),
      providesTags: ["All"],
    }),
  }),
});

export const {
  useCreateEmployeeMutation,
  useGetEmployeesQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useSingleEmployeeQuery,
  useLoginAdminMutation,
  useAssignedJobMutation,
  useCountEmployeesQuery,
  //leave
  useCreateLeaveMutation,
  useDeleteLeaveMutation,
  useReadLeaveQuery,
  useSingleLeaveQuery,
  useUpdateLeaveMutation,
  useApprovedMutation,
  useRejectedMutation,
  useAllLeaveWilhSpecficIdQuery,
  useSearchEmployeeQuery,

  //job
  useCreateJobMutation,
  useDeleteJobMutation,
  useReadJobQuery,
  useSingleJobQuery,
  useUpdateJobMutation,

  //department
  useCreateDepartmentMutation,
  useDeleteDepartmentMutation,
  useReadDepartmentQuery,
  useSingleDepartmentQuery,
  useUpdateDepartmentMutation,
  useCountDepartmentQuery,

  //payroll
  useCreatePayrollMutation,
  useGetPayrollQuery,
  usePaidSalaryMutation,
  useDeletePayrollMutation,
  // chart
  useChartDataQuery,
} = allApi;

export default allApi;
