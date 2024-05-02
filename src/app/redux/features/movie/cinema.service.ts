import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cinemaApi = createApi({
  reducerPath: "cinemaApi",
  tagTypes: ["interest", "bookedSeats"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URI}`,
  }),
  endpoints: (build) => ({
    getCinema: build.query<any, void>({
      query: () => "cinema",
      providesTags: ["bookedSeats"],
      // invalidatesTags: ["genres"],
    }),
    getBranch: build.query<any, void>({
      query: () => "branch",
      // providesTags: ["movies"],
    }),
    getBranchByIdBranch: build.query<any, void>({
      query: (id: any) => `branch/detail/${id}`,
      // invalidatesTags: ["bookedSeats"],
    }),
    getBranchByIdCinema: build.query<any, void>({
      query: (id: any) => `branch/${id}`,
      // providesTags: ["movies"],
    }),
    getInterest: build.query<any, void>({
      query: () => "interest/branch",
      // providesTags: ["bookedSeats"],
    }),
    getInterestByIdBranch: build.query<any, void>({
      query: (id) => `interest/branch?branchId=${id}`,
      // providesTags: ["movies"],
    }),
    getRoom: build.query<any, void>({
      query: () => `room`,
      // providesTags: ["movies"],
    }),
    getRoomById: build.query<any, void>({
      query: (id) => `room/${id}`,
      // providesTags: ["movies"],
    }),
    getBookedSeatsById: build.query<any, void>({
      query: (id) => `interest/detail/${id}`,
      // query: (id) => `room/${id}`,
      providesTags: ["bookedSeats"],
    }),

    getInterestByIdRoom: build.query<any, void>({
      query: () => `interest`,
      providesTags: ["interest"],
    }),
    addInterest: build.mutation<any, any>({
      query: (body) => ({
        url: "interest",
        method: "POST",
        body,
      }),
      invalidatesTags: ["interest"],
    }),
    // http://localhost:5000/api/v1/interest?branchId=65fb12eff8aec915987ba45a
    // deleteMovie: build.mutation<any, { id: any }>({
    //   query: (id) => ({
    //     url: `movie/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["movies"],
    // }),

    // addMovie: build.mutation<any, any>({
    //   query: (body) => ({
    //     url: "movie",
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["movies"],
    // }),
    checkoutTienMat: build.mutation<any, any>({
      query: (body: any) => ({
        url: "book",
        method: "POST",
        body,
      }),
      invalidatesTags: ["bookedSeats"],
    }),
    // editMovie: build.mutation<any, { id: any; body: any }>({
    //   query: ({ id, body }) => ({
    //     url: `movie/${id}`,
    //     method: "PUT",
    //     body,
    //   }),
    //   invalidatesTags: ["movies"],
    // }),
  }),
});

export const {
  useGetCinemaQuery,
  useGetBranchQuery,
  useGetInterestQuery,
  useGetBranchByIdBranchQuery,
  useGetBranchByIdCinemaQuery,
  useGetInterestByIdBranchQuery,
  useGetRoomQuery,
  useGetRoomByIdQuery,
  useGetInterestByIdRoomQuery,
  useAddInterestMutation,
  useCheckoutTienMatMutation,

  useGetBookedSeatsByIdQuery,
} = cinemaApi;
