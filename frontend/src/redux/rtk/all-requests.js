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

    getSuppliers: builder.query({
      query: () => ({
        url: "/suppliers",
        method: "GET",
      }),
      providesTags: ["All"],
    }),

    updateSupplier: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/suppliers/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["All"],
    }),

    createSupplier: builder.mutation({
      query: (data) => ({
        url: "/suppliers",
        method: "POST",
        body: data,
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
  useLogoutUserMutation,

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

  //supplier
  useGetSuppliersQuery,
  useUpdateSupplierMutation,
  useCreateSupplierMutation,
} = allApi;

export default allApi;
