import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "movies",
};

const searchToggleSlice = createSlice({
  name: "searchToggle",
  initialState,
  reducers: {
    toggleType: (state) => {
      state.type = state.type == "movies" ? "series" : "movies";
    },
  },
});

export const { toggleType } = searchToggleSlice.actions;
export const forToggle = searchToggleSlice.reducer;
