import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_HEADERS = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTRiN2JlZDYwYjY4Mzg0MTZiN2YyMWRmOGYxZGQ0YiIsIm5iZiI6MTc0NTEyMDY2Mi42ODgsInN1YiI6IjY4MDQ2ZDk2NmUxYTc2OWU4MWVlMDJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FowWTNxrhrDxwepk18gahAlGo_ocNTg5vwOfyMQ-BlY",
};

export const fetchNetworkDetails = createAsyncThunk(
  "network/fetchDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/network/${id}`, {
        headers: API_HEADERS,
      });
      if (!res.ok) throw new Error("Network response was not ok");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchNetworkSeries = createAsyncThunk(
  "network/fetchSeries",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/tv?with_networks=${id}&language=en-US`,
        {
          headers: API_HEADERS,
        }
      );
      if (!res.ok) throw new Error("Network response was not ok");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const networkSlice = createSlice({
  name: "network",
  initialState: {
    details: null,
    series: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNetworkDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNetworkDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchNetworkDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchNetworkSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNetworkSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.series = action.payload.results || [];
      })
      .addCase(fetchNetworkSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const networkReducer = networkSlice.reducer;
