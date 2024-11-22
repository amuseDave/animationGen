import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAnimationCreated: false,
  position: "cc",
  activeKeyFrame: 0,
  keyFrames: [
    { keyPercentage: 0, position: "cc" },
    { keyPercentage: 100, position: "cc" },
  ],
};

const customSlicer = createSlice({
  name: "custom-animations",
  initialState,

  reducers: {
    handleStartPosition(state, { payload }) {
      state.position = payload;
    },
    handleKeyFrame(state, { payload }) {
      console.log(payload);

      state.activeKeyFrame = payload;
    },
  },
});

export default customSlicer.reducer;
export const customActions = customSlicer.actions;
