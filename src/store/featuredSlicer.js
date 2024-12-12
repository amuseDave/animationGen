import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  animation: {},
};

const featuredSlicer = createSlice({
  name: "featured",
  initialState,
  reducers: {
    handleSetAnimation(state, { payload }) {
      state.animation = payload;
    },
  },
});

export default featuredSlicer.reducer;

export const featuredActions = featuredSlicer.actions;
