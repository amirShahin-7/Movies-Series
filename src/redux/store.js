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
import { movieDetails } from "./slices/moviesSlices/movieDetailsSlice";
import { keywordsMovies } from "./slices/moviesSlices/keywords/keywordsSlice";
import { movieReviews } from "./slices/moviesSlices/Social/SocialReviewsSlice";
import { mediaMovie } from "./slices/moviesSlices/mediaSlice/mediaSlice";
import { recommendationsMovies } from "./slices/moviesSlices/recommendation/recommendationsSlice";
import { collection } from "./slices/moviesSlices/collectionSlice/collection";
export const store = configureStore({
  reducer: {
    headerReducer,
    seriesReducer,
    seriesDetailsReducer,
    movies,
    movieDetails,
    topContent,
    castReducer,
    networkReducer,
    personReducer,
    keywordsReducer,
    seasonEpisodesReducer,
    seriesReviewsReducer,
    mediaReducer,
    recommendationsReducers,
    keywordsMovies,
    movieReviews,
    mediaMovie,
    recommendationsMovies,
    collection,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
