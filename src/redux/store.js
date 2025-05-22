import { configureStore } from "@reduxjs/toolkit";
import { headerReducer } from "./slices/searchSlice";
import { movies } from "./slices/moviesSlices/moviesSlice";
import { seriesReducer } from "./slices/series/seriesSlice";
import { seriesDetailsReducer } from "./slices/series/seriesDetailsSlice";
import { topContent } from "./slices/homeSlice/topContentSlice";
import { castReducer } from "./slices/series/cast/castSlice";
import { networkReducer } from "./slices/series/network/networkSlice";
import { personReducer } from "./slices/series/cast/personSlice";
import { keywordsReducer } from "./slices/series/keywords/keywordsSlice";
import { seasonEpisodesReducer } from "./slices/series/seasonEpisodes/seasonEpisodesSlice";
import { seriesReviewsReducer } from "./slices/series/Social/SocialReviewsSlice";
import { mediaReducer } from "./slices/series/mediaSlice/mediaSlice";
import { recommendationsReducers } from "./slices/series/recommendation/recommendationsSlice";
export const store = configureStore({
  reducer: {
    headerReducer,
    seriesReducer,
    seriesDetailsReducer,
    movies,
    topContent,
    castReducer,
    networkReducer,
    personReducer,
    keywordsReducer,
    seasonEpisodesReducer,
    seriesReviewsReducer,
    mediaReducer,
    recommendationsReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
