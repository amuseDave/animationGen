import { createSlice } from "@reduxjs/toolkit";
import getPositionStyles from "../utils/getPositionStyles";
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
      translateX: -50,
      translateY: -50,
      rotate: 0,
      left: `50%`,
      top: `50%`,
    },
    {
      keyPercentage: 100,
      oldPos: "cc",
      position: "cc",

      color: "#52525b",
      opacity: 1,

      scale: 1,
      translateX: -50,
      translateY: -50,
      rotate: 0,

      left: `50%`,
      top: `50%`,
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
    handleSetPosition(state, { payload: { action, pos, zoomLevel } }) {
      const curKF = state.keyFrames[state.activeKeyFrame];

      if (action === "set-new") {
        curKF.position = pos;

        const vanillaPosStyles = getPositionStyles(pos);

        console.log(vanillaPosStyles);

        curKF.bottom = vanillaPosStyles.bottom || "unset";
        curKF.top = vanillaPosStyles.top || "unset";
        curKF.left = vanillaPosStyles.left || "unset";
        curKF.right = vanillaPosStyles.right || "unset";

        curKF.translateX = vanillaPosStyles.translateX;
        curKF.translateY = vanillaPosStyles.translateY;
      }
      if (action === "set-old") {
        curKF.oldPos = pos;
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
