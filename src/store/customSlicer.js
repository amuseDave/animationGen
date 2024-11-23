import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAnimationCreated: false,
  activeKeyFrame: 0,
  keyFrames: [
    {
      keyPercentage: 0,
      oldPos: "cc",
      position: "cc",
      color: "#52525b",
      opacity: 1,
      scale: 1,
    },
    {
      keyPercentage: 100,
      oldPos: "cc",
      position: "cc",
      color: "#52525b",
      opacity: 1,
      scale: 1,
    },
  ],
};

const customSlicer = createSlice({
  name: "custom-animations",
  initialState,

  reducers: {
    handleKeyFrame(state, { payload }) {
      state.activeKeyFrame = payload;
    },
    handleSetPosition(state, { payload: { action, pos } }) {
      if (action === "set-new") {
        state.keyFrames[state.activeKeyFrame].position = pos;
      }
      if (action === "set-old") {
        state.keyFrames[state.activeKeyFrame].oldPos = pos;
      }
    },
    handleStyles(state, { payload: { action, value } }) {
      console.log(action, value);

      switch (action) {
        case "set-color":
          state.keyFrames[state.activeKeyFrame].color = value;
          break;
        case "set-opacity":
          state.keyFrames[state.activeKeyFrame].opacity = value;
          break;
        default:
          state.keyFrames[state.activeKeyFrame].scale = value;
          break;
      }
    },
  },
});

export default customSlicer.reducer;
export const customActions = customSlicer.actions;
