import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAnimationCreated: false,
};

const customSlicer = createSlice({
  name: "custom-animations",
  initialState,
  reducers: {},
});

export default customSlicer.reducer;
export const customActions = customSlicer.actions;
