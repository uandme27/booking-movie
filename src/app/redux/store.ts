"use client";

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/auth/authApi";
import movieSlice from "./features/movie/movieSlice";
import { movieApi } from "./features/movie/movie.service";
import { genreApi } from "./features/movie/genre.service";
import { cinemaApi } from "./features/movie/cinema.service";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "./features/auth/authSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
    [genreApi.reducerPath]: genreApi.reducer,
    [cinemaApi.reducerPath]: cinemaApi.reducer,
    auth: authSlice,
    movies: movieSlice,
  },
  devTools: true,
  middleware: (getDedaultMiddleware) =>
    getDedaultMiddleware().concat(
      movieApi.middleware,
      genreApi.middleware,
      cinemaApi.middleware,
  apiSlice.middleware
    ),
});
setupListeners(store.dispatch);

//call the refresh token fuction on every page load
// const initializeApp = async () => {
//   await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, {}));
//   await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, {}));
// };
// initializeApp();
