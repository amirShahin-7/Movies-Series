import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTRiN2JlZDYwYjY4Mzg0MTZiN2YyMWRmOGYxZGQ0YiIsIm5iZiI6MTc0NTEyMDY2Mi42ODgsInN1YiI6IjY4MDQ2ZDk2NmUxYTc2OWU4MWVlMDJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FowWTNxrhrDxwepk18gahAlGo_ocNTg5vwOfyMQ-BlY",
  },
};

export const fetchMoviesSearch = createAsyncThunk(
  "search/fetchMoviesSearch",
  async (query, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          query
        )}&include_adult=false&language=en-US&page=1`,
        options
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSeriesSearch = createAsyncThunk(
  "search/fetchSeriesSearch",
  async (query, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
          query
        )}&include_adult=false&language=en-US&page=1`,
        options
      );
      if (!response.ok) {
        throw new Error("Failed to fetch series");
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    type: "series",
    query: "",
    results: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    toggleType: (state) => {
      state.type = state.type === "series" ? "movies" : "series";
      state.results = [];
      state.query = "";
    },
    clearResults: (state) => {
      state.results = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesSearch.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.hasError = false;
      })
      .addCase(fetchMoviesSearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.results = action.payload;
      })
      .addCase(fetchMoviesSearch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.hasError = true;
      })
      .addCase(fetchSeriesSearch.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.hasError = false;
      })
      .addCase(fetchSeriesSearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.results = action.payload;
      })
      .addCase(fetchSeriesSearch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.hasError = true;
      });
  },
});

export const { setQuery, toggleType, clearResults } = searchSlice.actions;
export const headerReducer = searchSlice.reducer;
