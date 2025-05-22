import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_HEADERS = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTRiN2JlZDYwYjY4Mzg0MTZiN2YyMWRmOGYxZGQ0YiIsIm5iZiI6MTc0NTEyMDY2Mi42ODgsInN1YiI6IjY4MDQ2ZDk2NmUxYTc2OWU4MWVlMDJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FowWTNxrhrDxwepk18gahAlGo_ocNTg5vwOfyMQ-BlY",
};

export const fetchSeriesKeywords = createAsyncThunk(
  "keywords/fetchSeriesKeywords",
  async (seriesId, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${seriesId}/keywords?language=en-US`,
        { headers: API_HEADERS }
      );
      if (!res.ok) throw new Error("Keywords response was not ok");
      const data = await res.json();
      return data.results || [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchKeywordSeries = createAsyncThunk(
  "keywords/fetchKeywordSeries",
  async ({ keywordId, page = 1 }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/tv?with_keywords=${keywordId}&language=en-US&page=${page}`,
        { headers: API_HEADERS }
      );
      if (!res.ok) throw new Error("Keyword series response was not ok");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const keywordsSlice = createSlice({
  name: "keywords",
  initialState: {
    seriesKeywords: [],
    keywordSeries: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeriesKeywords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeriesKeywords.fulfilled, (state, action) => {
        state.loading = false;
        state.seriesKeywords = action.payload;
      })
      .addCase(fetchSeriesKeywords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchKeywordSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKeywordSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.keywordSeries = action.payload.results || [];
      })
      .addCase(fetchKeywordSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const keywordsReducer = keywordsSlice.reducer;
