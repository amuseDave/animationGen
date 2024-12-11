import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeIndex: 0,
  animationNames: [],
  animations: [],
};

const featuredSlicer = createSlice({
  name: "featured",
  initialState,
  reducers: {},
});

export default featuredSlicer.reducer;

export const featuredActions = featuredSlicer.actions;
