import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSeriesReviews = createAsyncThunk(
  "seriesReviews/fetchSeriesReviews",
  async (seriesId, { rejectWithValue }) => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTRiN2JlZDYwYjY4Mzg0MTZiN2YyMWRmOGYxZGQ0YiIsIm5iZiI6MTc0NTEyMDY2Mi42ODgsInN1YiI6IjY4MDQ2ZDk2NmUxYTc2OWU4MWVlMDJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FowWTNxrhrDxwepk18gahAlGo_ocNTg5vwOfyMQ-BlY",
        },
      };
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${seriesId}/reviews?language=en-US&page=1`,
        options
      );
      if (!response.ok) {
        throw new Error("Failed to fetch series reviews");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "An error occurred while fetching reviews"
      );
    }
  }
);

const initialState = {
  reviews: [],
  totalReviews: 0,
  isLoading: false,
  error: null,
};

const reviewsSlice = createSlice({
  name: "seriesReviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeriesReviews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSeriesReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.results || [];
        state.totalReviews = action.payload.total_results || 0;
      })
      .addCase(fetchSeriesReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.reviews = [];
        state.totalReviews = 0;
      });
  },
});

export const seriesReviewsReducer = reviewsSlice.reducer;
