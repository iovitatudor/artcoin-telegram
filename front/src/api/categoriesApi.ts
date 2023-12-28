import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {CategoryType} from "../types/CategoryType";

export const categoriesApi = createApi({
  reducerPath: 'categoriesAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api`
  }),
  tagTypes: ['Category'],
  endpoints: (build) => ({
    fetchAllCategories: build.query<CategoryType[], void>({
      query: () => ({
        url: `/categories`,
      }),
      providesTags: result => ['Category']
    }),
    fetchCategoriesChildren: build.query<CategoryType[], number>({
      query: () => ({
        url: `/categories/children}`,
      }),
      providesTags: result => ['Category']
    }),
    fetchCategoryById: build.query<CategoryType, number>({
      query: (id) => ({
        url: `/categories/${id}`,
      }),
      providesTags: result => ['Category']
    }),
  })
})