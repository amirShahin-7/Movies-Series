import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_HEADERS = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTRiN2JlZDYwYjY4Mzg0MTZiN2YyMWRmOGYxZGQ0YiIsIm5iZiI6MTc0NTEyMDY2Mi42ODgsInN1YiI6IjY4MDQ2ZDk2NmUxYTc2OWU4MWVlMDJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FowWTNxrhrDxwepk18gahAlGo_ocNTg5vwOfyMQ-BlY",
};

export const fetchCollection = createAsyncThunk(
  "collection/fetchCollection",
  async (collection_id, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/collection/${collection_id}`,
        { headers: API_HEADERS }
      );
      if (!res.ok) throw new Error("collection response was not ok");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    collection: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollection.fulfilled, (state, action) => {
        state.loading = false;
        state.collection = action.payload;
      })
      .addCase(fetchCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const collection = collectionSlice.reducer;
