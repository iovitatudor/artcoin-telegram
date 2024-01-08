import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ProductType} from "../types/ProductType";

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api`
  }),
  tagTypes: ['Product'],
  endpoints: (build) => ({
    fetchAllProducts: build.query<ProductType[], void>({
      query: () => ({
        url: `/products`,
      }),
      providesTags: result => ['Product']
    }),
    searchProducts: build.query<ProductType[], string>({
      query: (find: string) => ({
        url: `/products/search?find=${find}`,
      }),
    }),
    fetchProductsByCategory: build.query<ProductType[], { categoryId: number, filter?: string }>({
      query: (data: any) => ({
        url: `/products/category/${data.categoryId}?${data.filter}`,
      }),
    }),
    fetchTopProducts: build.query<ProductType[], void>({
      query: () => ({
        url: `/products/top`,
      }),
      providesTags: result => ['Product']
    }),
    fetchHotProducts: build.query<ProductType[], void>({
      query: () => ({
        url: `/products/hot`,
      }),
      providesTags: result => ['Product']
    }),
    fetchProductById: build.query<ProductType, number>({
      query: (id) => ({
        url: `/products/${id}`,
      }),
      providesTags: result => ['Product']
    }),
  })
})