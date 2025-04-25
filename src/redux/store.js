import { configureStore } from "@reduxjs/toolkit";
import { forToggle } from "./slices/searchToggleSlice";
import { seriesReducer } from "./slices/series/seriesSlice";
import { seriesDetailsReducer } from "./slices/series/seriesDetailsSlice";
export const store = configureStore({
  reducer: { forToggle, seriesReducer, seriesDetailsReducer },
});
