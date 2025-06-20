import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_HEADERS = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTRiN2JlZDYwYjY4Mzg0MTZiN2YyMWRmOGYxZGQ0YiIsIm5iZiI6MTc0NTEyMDY2Mi42ODgsInN1YiI6IjY4MDQ2ZDk2NmUxYTc2OWU4MWVlMDJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FowWTNxrhrDxwepk18gahAlGo_ocNTg5vwOfyMQ-BlY",
};

export const fetchMovieKeywords = createAsyncThunk(
  "keywords/fetchMovieKeywords",
  async (movie_id, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}/keywords?language=en-US`,
        { headers: API_HEADERS }
      );
      if (!res.ok) throw new Error("Keywords response was not ok");
      const data = await res.json();
      return data.keywords || [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchKeywordMovie = createAsyncThunk(
  "keywords/fetchKeywordMovie",
  async ({ keywordId, page = 1 }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_keywords=${keywordId}&language=en-US&page=${page}`,
        { headers: API_HEADERS }
      );
      if (!res.ok) throw new Error("Keyword movie response was not ok");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const keywordsSlice = createSlice({
  name: "keywords",
  initialState: {
    movieKeywords: [],
    keywordMovie: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieKeywords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieKeywords.fulfilled, (state, action) => {
        state.loading = false;
        state.movieKeywords = action.payload;
      })
      .addCase(fetchMovieKeywords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchKeywordMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKeywordMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.keywordMovie = action.payload.keywords || [];
      })
      .addCase(fetchKeywordMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const keywordsMovies = keywordsSlice.reducer;
