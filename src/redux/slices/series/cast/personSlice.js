import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_HEADERS = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTRiN2JlZDYwYjY4Mzg0MTZiN2YyMWRmOGYxZGQ0YiIsIm5iZiI6MTc0NTEyMDY2Mi42ODgsInN1YiI6IjY4MDQ2ZDk2NmUxYTc2OWU4MWVlMDJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FowWTNxrhrDxwepk18gahAlGo_ocNTg5vwOfyMQ-BlY",
};

export const fetchPersonDetails = createAsyncThunk(
  "person/fetchDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/person/${id}?language=en-US`,
        {
          headers: API_HEADERS,
        }
      );
      if (!res.ok) throw new Error("Person response was not ok");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchPersonCombinedCredits = createAsyncThunk(
  "person/fetchCombinedCredits",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`,
        { headers: API_HEADERS }
      );
      if (!res.ok) throw new Error("Credits response was not ok");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchPersonExternalIds = createAsyncThunk(
  "person/fetchExternalIds",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/person/${id}/external_ids`,
        { headers: API_HEADERS }
      );
      if (!res.ok) throw new Error("External IDs response was not ok");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const personSlice = createSlice({
  name: "person",
  initialState: {
    details: null,
    combined_credits: { cast: [], crew: [] },
    external_ids: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchPersonDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPersonCombinedCredits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonCombinedCredits.fulfilled, (state, action) => {
        state.loading = false;
        state.combined_credits = action.payload;
      })
      .addCase(fetchPersonCombinedCredits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPersonExternalIds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonExternalIds.fulfilled, (state, action) => {
        state.loading = false;
        state.external_ids = action.payload;
      })
      .addCase(fetchPersonExternalIds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const personReducer = personSlice.reducer;
