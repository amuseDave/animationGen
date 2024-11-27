import { createSlice } from "@reduxjs/toolkit";
import getPositionStyles from "../utils/helper";
const initialState = {
  isAnimationCreated: false,
  isValidKeyFrame: null,
  duration: 2,
  activeKeyFrame: 0,
  keyFramePers: [0, 100],
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
      left: "50%",
      top: "50%",
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

      left: "50%",
      top: "50%",
    },
  ],
};

const customSlicer = createSlice({
  name: "custom-animations",
  initialState,

  reducers: {
    handleSetPosition(state, { payload: { action, pos, x, y } }) {
      const curKF = state.keyFrames[state.activeKeyFrame];

      if (action === "set-new") {
        curKF.position = pos;

        const vanillaPosStyles = getPositionStyles(pos);

        curKF.bottom = vanillaPosStyles.bottom || "unset";
        curKF.top = vanillaPosStyles.top || "unset";
        curKF.left = vanillaPosStyles.left || "unset";
        curKF.right = vanillaPosStyles.right || "unset";

        curKF.translateX = vanillaPosStyles.translateX;
        curKF.translateY = vanillaPosStyles.translateY;
      }
      if (action === "set-translate") {
        curKF.translateX = x || curKF.translateX;
        curKF.translateY = y || curKF.translateY;
      }

      if (action === "set-old") {
        curKF.oldPos = pos;
      }
    },
    handleStyles(state, { payload: { action, value } }) {
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
    handleKeyFrame(
      state,
      { payload: { action, value, copyIndex, currentIndex } }
    ) {
      switch (action) {
        case "add": {
          const index = state.keyFramePers.findIndex((per) => value < per);
          state.keyFramePers.splice(index, 0, value);
          state.keyFrames.splice(index, 0, {
            ...state.keyFrames[index - 1],
            keyPercentage: value,
          });

          state.activeKeyFrame = index;
          state.isValidKeyFrame = true;
          break;
        }
        case "copy": {
          const keyPercentage = state.keyFramePers[currentIndex];
          state.keyFrames[currentIndex] = {
            ...state.keyFrames[copyIndex],
            keyPercentage,
          };

          state.isValidKeyFrame = state.keyFramePers[copyIndex];
          break;
        }
        case "validation":
          state.isValidKeyFrame = value;
          break;
        case "switch":
          state.activeKeyFrame = value;
          break;
      }
    },
    handleAnimationState(state, { payload: { action, value } }) {
      if (action === "duration") {
        state.duration = value;
      }
    },
  },
});

export default customSlicer.reducer;
export const customActions = customSlicer.actions;
