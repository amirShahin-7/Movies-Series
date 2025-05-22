import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_HEADERS = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTRiN2JlZDYwYjY4Mzg0MTZiN2YyMWRmOGYxZGQ0YiIsIm5iZiI6MTc0NTEyMDY2Mi42ODgsInN1YiI6IjY4MDQ2ZDk2NmUxYTc2OWU4MWVlMDJmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FowWTNxrhrDxwepk18gahAlGo_ocNTg5vwOfyMQ-BlY",
};

export const fetchSeasonEpisodes = createAsyncThunk(
  "seasonEpisodes/fetchEpisodes",
  async ({ seriesId, seasonNumber }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}?language=en-US`,
        { headers: API_HEADERS }
      );
      if (!res.ok) throw new Error("Episodes response was not ok");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchEpisodeCredits = createAsyncThunk(
  "seasonEpisodes/fetchEpisodeCredits",
  async (
    { seriesId, seasonNumber, episodeNumber, episodeId },
    { rejectWithValue }
  ) => {
    try {
      if (!episodeNumber || episodeNumber < 1)
        throw new Error("Invalid episode number");
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/credits?language=en-US`,
        { headers: API_HEADERS }
      );
      if (!res.ok)
        throw new Error(
          `Episode credits response was not ok: ${res.statusText}`
        );
      return { data: await res.json(), episodeId };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const seasonEpisodesSlice = createSlice({
  name: "seasonEpisodes",
  initialState: {
    episodes: [],
    guestStars: [],
    episodeCredits: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeasonEpisodes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeasonEpisodes.fulfilled, (state, action) => {
        state.loading = false;
        state.episodes = action.payload.episodes || [];
        state.guestStars = action.payload.episodes
          .flatMap((ep) => ep.guest_stars || [])
          .filter((g) => g);
      })
      .addCase(fetchSeasonEpisodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEpisodeCredits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEpisodeCredits.fulfilled, (state, action) => {
        state.loading = false;
        state.episodeCredits[action.payload.episodeId] = action.payload.data;
      })
      .addCase(fetchEpisodeCredits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const seasonEpisodesReducer = seasonEpisodesSlice.reducer;
