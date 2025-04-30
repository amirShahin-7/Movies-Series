import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTopContent = createAsyncThunk(
  "topContent/fetchAll",
  async (i, { rejectWithValue }) => {
    try {
      // Fetch Top Movies
      const moviesRes = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxM2VmMWM1YTc3NjUzNzEyMzU3OTVhMzNjZDY2YWY4MCIsIm5iZiI6MTc0NTM2MDA5NS40Mywic3ViIjoiNjgwODE0ZGYxNWExZDVhNjE0YWE5OGM5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.VWb6k0xb3Hgx6N5I3qEZZFCFs97i4C0IWzb1-9KC5Xg",
          },
        }
      );
      const moviesData = await moviesRes.json();

      // Fetch Top Series
      const seriesRes = await fetch(
        "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxM2VmMWM1YTc3NjUzNzEyMzU3OTVhMzNjZDY2YWY4MCIsIm5iZiI6MTc0NTM2MDA5NS40Mywic3ViIjoiNjgwODE0ZGYxNWExZDVhNjE0YWE5OGM5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.VWb6k0xb3Hgx6N5I3qEZZFCFs97i4C0IWzb1-9KC5Xg",
          },
        }
      );
      const seriesData = await seriesRes.json();

      return {
        topMovies: moviesData.results,
        topSeries: seriesData.results,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  topMovies: [],
  topSeries: [],
  loading: false,
  error: null,
};

const topContentSlice = createSlice({
  name: "topContent",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopContent.fulfilled, (state, action) => {
        state.loading = false;
        state.topMovies = action.payload.topMovies;
        state.topSeries = action.payload.topSeries;
      })
      .addCase(fetchTopContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const topContent = topContentSlice.reducer;
