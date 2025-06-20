import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_HEADERS = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTRiN2JlZDYwYjY4Mzg0MTZiN2YyMWRmOGYxZGQ0YiIsIm5iZiI6MTc0NTEyMDY2Mi42ODgsInN1YiI6IjY4MDQ2ZDk2NmUxYTc2OWU4MWVlMDJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FowWTNxrhrDxwepk18gahAlGo_ocNTg5vwOfyMQ-BlY",
};
// Fetch movie Details
export const moviesDetails = createAsyncThunk(
  "/details/moviesDetails",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        method: "get",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxM2VmMWM1YTc3NjUzNzEyMzU3OTVhMzNjZDY2YWY4MCIsIm5iZiI6MTc0NTM2MDA5NS40Mywic3ViIjoiNjgwODE0ZGYxNWExZDVhNjE0YWE5OGM5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.VWb6k0xb3Hgx6N5I3qEZZFCFs97i4C0IWzb1-9KC5Xg",
        },
      };
      const req = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        config
      );
      const res = await req.json();
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const fetchMovieCredits = createAsyncThunk(
  "details/fetchMovieCredits",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits`,
        { headers: API_HEADERS }
      );
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchMovieVideos = createAsyncThunk(
  "details/fetchSeriesVideos",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        { headers: API_HEADERS }
      );
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchExternalIds = createAsyncThunk(
  "details/fetchExternalIds",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/external_ids`,
        { headers: API_HEADERS }
      );
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const detailsSlice = createSlice({
  name: "movieDetails",
  initialState: {
    cast: null,
    crew: null,
    videos: null,
    externalIds: null,
    details: [],
    loading: true,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(moviesDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(moviesDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(moviesDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMovieCredits.fulfilled, (state, action) => {
        state.cast = action.payload.cast;
        state.crew = action.payload.crew;
      })
      .addCase(fetchMovieCredits.rejected, (state) => {
        state.cast = null;
        state.crew = null;
      })
      .addCase(fetchMovieVideos.fulfilled, (state, action) => {
        state.videos = action.payload;
      })
      .addCase(fetchMovieVideos.rejected, (state) => {
        state.videos = null;
      })
      .addCase(fetchExternalIds.fulfilled, (state, action) => {
        state.externalIds = action.payload;
      })
      .addCase(fetchExternalIds.rejected, (state) => {
        state.externalIds = null;
      });
  },
});

export const movieDetails = detailsSlice.reducer;
