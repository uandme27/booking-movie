import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const genreApi = createApi({
  reducerPath: "genreApi",
  tagTypes: ["genres"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URI}`,
  }),
  endpoints: (build) => ({
    getGenre: build.query<any, void>({
      query: () => "genre",
      providesTags: ["genres"],
    }),

    deleteGenre: build.mutation<any, { id: any }>({
      query: (id) => ({
        url: `genre/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["genres"],
    }),

    addGenre: build.mutation<any, any>({
      query: (body) => ({
        url: "genre",
        method: "POST",
        body,
      }),
      invalidatesTags: ["genres"],
    }),

    editGenre: build.mutation<any, { id: any; body: any }>({
      query: ({ id, body }) => ({
        url: `genre/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["genres"],
    }),
  }),
});

export const {
  useGetGenreQuery,
  useAddGenreMutation,
  useDeleteGenreMutation,
  useEditGenreMutation,
} = genreApi;
