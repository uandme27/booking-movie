import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const movieApi = createApi({
  reducerPath: "movieApi",
  tagTypes: ["movies"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URI}`,
  }),
  endpoints: (build) => ({
    getMovie: build.query<any, void>({
      query: () => "movie?limit=0",
      providesTags: ["movies"],
    }),

    deleteMovie: build.mutation<any, { id: any }>({
      query: (id) => ({
        url: `movie/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["movies"],
    }),

    addMovie: build.mutation<any, any>({
      query: (body) => ({
        url: "movie",
        method: "POST",
        body,
      }),
      invalidatesTags: ["movies"],
    }),

    editMovie: build.mutation<any, { id: any; body: any }>({
      query: ({ id, body }) => ({
        url: `movie/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["movies"],
    }),
  }),
});

export const {
  useGetMovieQuery,
  useAddMovieMutation,
  useDeleteMovieMutation,
  useEditMovieMutation,
} = movieApi;
