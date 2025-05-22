import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_HEADERS = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTRiN2JlZDYwYjY4Mzg0MTZiN2YyMWRmOGYxZGQ0YiIsIm5iZiI6MTc0NTEyMDY2Mi42ODgsInN1YiI6IjY4MDQ2ZDk2NmUxYTc2OWU4MWVlMDJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FowWTNxrhrDxwepk18gahAlGo_ocNTg5vwOfyMQ-BlY",
};
// Fetch Series Details
export const fetchSeriesDetails = createAsyncThunk(
  "details/fetchSeriesDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
        { headers: API_HEADERS }
      );
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Fetch Credits
export const fetchSeriesCredits = createAsyncThunk(
  "details/fetchSeriesCredits",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`,
        { headers: API_HEADERS }
      );
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Fetch Series Videos
export const fetchSeriesVideos = createAsyncThunk(
  "details/fetchSeriesVideos",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
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
        `https://api.themoviedb.org/3/tv/${id}/external_ids`,
        { headers: API_HEADERS }
      );
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const detailsSlice = createSlice({
  name: "seriesDetails",
  initialState: {
    details: null,
    credits: null,
    videos: null,
    externalIds: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeriesDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeriesDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchSeriesDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSeriesCredits.fulfilled, (state, action) => {
        state.credits = action.payload;
      })
      .addCase(fetchSeriesCredits.rejected, (state) => {
        state.credits = null;
      })
      .addCase(fetchSeriesVideos.fulfilled, (state, action) => {
        state.videos = action.payload;
      })
      .addCase(fetchSeriesVideos.rejected, (state) => {
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

export const seriesDetailsReducer = detailsSlice.reducer;
