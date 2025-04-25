import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSeries = createAsyncThunk(
  "series/fetchSeries",
  async (page, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTRiN2JlZDYwYjY4Mzg0MTZiN2YyMWRmOGYxZGQ0YiIsIm5iZiI6MTc0NTEyMDY2Mi42ODgsInN1YiI6IjY4MDQ2ZDk2NmUxYTc2OWU4MWVlMDJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FowWTNxrhrDxwepk18gahAlGo_ocNTg5vwOfyMQ-BlY",
          },
        }
      );
      const data = await res.json();
      return data.results;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const seriesSlice = createSlice({
  name: "seriesReducer",
  initialState: {
    list: [],
    page: 1,
    loading: false,
    error: null,
    lastViewedPage: 1,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLastViewedPage: (state, action) => {
      state.lastViewedPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, setLastViewedPage } = seriesSlice.actions;
export const seriesReducer = seriesSlice.reducer;
