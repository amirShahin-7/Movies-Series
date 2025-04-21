import { configureStore } from "@reduxjs/toolkit";
import{ forToggle } from "./slices/searchToggleSlice";

export const store = configureStore({
  reducer: { forToggle },
});
