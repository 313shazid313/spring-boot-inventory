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
        url: `/api/v1/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["All"],
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: "/categories",
        method: "POST",
        body: data,
      }),
      providesTags: ["All"],
    }),

    getCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["All"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["All"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["All"],
    }),

    singleCategory: builder.query({
      query: (id) => `/categories/${id}`,
      providesTags: ["All"],
    }),

    createItem: builder.mutation({
      query: ({ categoryId, body }) => ({
        url: `/items/${categoryId}`,
        method: "POST",
        body,
      }),
    }),

    getItems: builder.query({
      query: () => ({
        url: "/items",
        method: "GET",
      }),
      providesTags: ["All"],
    }),

    updateItem: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/items/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["All"],
    }),

    deleteItem: builder.mutation({
      query: (id) => ({
        url: `/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["All"],
    }),

    singleItem: builder.query({
      query: (id) => `/items/${id}`,
      providesTags: ["All"],
    }),

    loginAdmin: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
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

  //category
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useSingleCategoryQuery,

  //item
  useCreateItemMutation,
  useGetItemsQuery,
  useUpdateItemMutation,
  useDeleteItemMutation,
  useSingleItemQuery,
} = allApi;

export default allApi;
