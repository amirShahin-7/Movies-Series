import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTRiN2JlZDYwYjY4Mzg0MTZiN2YyMWRmOGYxZGQ0YiIsIm5iZiI6MTc0NTEyMDY2Mi42ODgsInN1YiI6IjY4MDQ2ZDk2NmUxYTc2OWU4MWVlMDJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FowWTNxrhrDxwepk18gahAlGo_ocNTg5vwOfyMQ-BlY",
  },
};

export const fetchVideos = createAsyncThunk(
  "media/fetchVideos",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
        options
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchImages = createAsyncThunk(
  "media/fetchImages",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/images`,
        options
      );
      const data = await response.json();
      return {
        backdrops: data.backdrops || [],
        posters: data.posters || [],
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const mediaSlice = createSlice({
  name: "media",
  initialState: {
    videos: [],
    backdrops: [],
    posters: [],
    selectedTab: "videos",
    isLoading: false,
    error: null,
  },
  reducers: {
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchImages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.backdrops = action.payload.backdrops;
        state.posters = action.payload.posters;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedTab } = mediaSlice.actions;
export const mediaReducer = mediaSlice.reducer;
