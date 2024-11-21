import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAnimationCreated: false,
  position: "cc",
};

const customSlicer = createSlice({
  name: "custom-animations",
  initialState,
  reducers: {
    setPosition(state, { payload }) {
      state.position = payload;
    },
  },
});

export default customSlicer.reducer;
export const customActions = customSlicer.actions;
