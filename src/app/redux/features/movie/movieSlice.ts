import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let moviesCache: any = null;
export const fetchMovies: any = createAsyncThunk("movies/status", async () => {
  const response = await axios.get(
    "http://localhost:5000/api/v1/movie?limit=10"
  );
  return response.data;
});
export const fetchAddMovies = createAsyncThunk(
  "movies/status",
  async (movieData) => {
    await axios.post("http://localhost:5000/api/v1/movie", movieData);
  }
);
export const fetchDeleteMovies = createAsyncThunk(
  "movies/status",
  async (id) => {
    await axios.delete(`http://localhost:5000/api/v1/movie/${id}`);
  }
);
export const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state: any, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = movieSlice.actions;

export default movieSlice.reducer;
