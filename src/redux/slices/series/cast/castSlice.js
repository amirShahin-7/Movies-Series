import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCast = createAsyncThunk(
  "cast/fetchCast",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/aggregate_credits?language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTRiN2JlZDYwYjY4Mzg0MTZiN2YyMWRmOGYxZGQ0YiIsIm5iZiI6MTc0NTEyMDY2Mi42ODgsInN1YiI6IjY4MDQ2ZDk2NmUxYTc2OWU4MWVlMDJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FowWTNxrhrDxwepk18gahAlGo_ocNTg5vwOfyMQ-BlY",
          },
        }
      );
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const castSlice = createSlice({
  name: "cast",
  initialState: {
    cast: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCast.fulfilled, (state, action) => {
        state.loading = false;
        state.cast = action.payload.cast;
      })
      .addCase(fetchCast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const castReducer = castSlice.reducer;
