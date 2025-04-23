import { configureStore } from "@reduxjs/toolkit";
import{ forToggle } from "./slices/searchToggleSlice";
import { movies } from "./slices/moviesSlices/moviesSlice";

export const store = configureStore({
  reducer: { forToggle,movies },
});
