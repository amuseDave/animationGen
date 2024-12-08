import { createSlice } from "@reduxjs/toolkit";
import getPositionStyles, { stringifyStyles } from "../utils/helper";
import { toast } from "react-toastify";

let posN;
let resetN;
let resetErrN;
let createdN;
let deletedN;
let copyN;

const initialState = {
  reset: false,
  animationFunction: "ease",
  duration: 2,
  activeKeyFrame: 0,
  keyFramePers: [0, 100],
  keyFrames: [
    {
      keyPercentage: 0,
      position: "cc",

      textColor: "#000000",
      textOpacity: 100,
      backgroundColor: "#E1FF9A",
      bgOpacity: 100,
      opacity: 100,

      scaleX: 1,
      scaleY: 1,
      translateX: -50,
      translateY: -50,
      rotate: 0,
      left: "50%",
      top: "50%",
    },
    {
      keyPercentage: 100,
      position: "cc",

      textColor: "#000000",
      textOpacity: 100,
      backgroundColor: "#E1FF9A",
      bgOpacity: 100,
      opacity: 100,

      scaleX: 1,
      scaleY: 1,
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
  initialState: {},

  reducers: {
    handleSetPosition(state, { payload: { action, pos, x, y } }) {
      const curKF = state.keyFrames[state.activeKeyFrame];

      if (action === "set-new") {
        curKF.position = pos;

        const vanillaPosStyles = getPositionStyles(pos);

        curKF.top = vanillaPosStyles.top || "unset";
        curKF.left = vanillaPosStyles.left || "unset";

        curKF.translateX = vanillaPosStyles.translateX;
        curKF.translateY = vanillaPosStyles.translateY;

        ///
        if (posN) return;
        posN = true;
        setTimeout(() => {
          posN = false;
        }, 1000);
        toast.success("Position changed!");
        ///
      }
      if (action === "set-translate") {
        curKF.translateX = x !== undefined ? Math.round(x) : curKF.translateX;
        curKF.translateY = y !== undefined ? Math.round(y) : curKF.translateY;
      }
    },

    handleStyles(state, { payload: { action, value } }) {
      switch (action) {
        case "set-background-color": {
          state.keyFrames[state.activeKeyFrame].bgOpacity = value.opacity;
          state.keyFrames[state.activeKeyFrame].backgroundColor = value.color;
          break;
        }
        case "set-text-color": {
          state.keyFrames[state.activeKeyFrame].textOpacity = value.opacity;
          state.keyFrames[state.activeKeyFrame].textColor = value.color;
          break;
        }
        case "set-opacity":
          state.keyFrames[state.activeKeyFrame].opacity = value;
          break;
        case "set-rotate":
          state.keyFrames[state.activeKeyFrame].rotate = +value;
          break;
        case "set-duration":
          state.duration = +value;
      }
    },
    handleScale(state, { payload: { type, value } }) {
      if (type === "x") state.keyFrames[state.activeKeyFrame].scaleX = value;
      if (type === "y") state.keyFrames[state.activeKeyFrame].scaleY = value;
    },
    handleAnimationState(state, { payload: { action, value } }) {
      if (action === "animation") {
        state.animationFunction = value;
      } else if (action === "duration") {
        state.duration = value;
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

          ///
          if (createdN) return;
          createdN = true;
          setTimeout(() => {
            createdN = false;
          }, 1000);
          toast.success("Key frame has been created!");
          ///
          break;
        }
        case "delete": {
          state.keyFrames.splice(state.activeKeyFrame, 1);
          state.keyFramePers.splice(state.activeKeyFrame, 1);
          ///
          if (deletedN) return;
          deletedN = true;
          setTimeout(() => {
            deletedN = false;
          }, 1000);
          toast.success("Keyframe has been deleted!");
          ///
          break;
        }
        case "copy": {
          const keyPercentage = state.keyFramePers[currentIndex];
          state.keyFrames[currentIndex] = {
            ...state.keyFrames[copyIndex],
            keyPercentage,
          };

          ///
          if (copyN) return;
          copyN = true;
          setTimeout(() => {
            copyN = false;
          }, 1000);
          toast.success(
            `Keyframe (${state.keyFramePers[copyIndex]}%) properties has been copied!`
          );
          ///
          break;
        }

        case "change-active":
          state.activeKeyFrame = value;
          break;
      }
    },
    handleNextPrevKF(state, { payload }) {
      if (payload === "next") {
        if (state.activeKeyFrame + 1 > state.keyFramePers.length - 1) return;
        state.activeKeyFrame++;
      }
      if (payload === "prev") {
        if (state.activeKeyFrame - 1 < 0) return;
        state.activeKeyFrame--;
      }
    },
    handleReset(state) {
      if (state.keyFrames.length > 2) {
        ///

        if (resetN) return { ...initialState, reset: !state.reset };
        resetN = true;
        setTimeout(() => {
          resetN = false;
        }, 1000);
        toast.success("Keyframes has been reset");
        return { ...initialState, reset: !state.reset };
        ///
      }

      for (let i = 0; i < state.keyFrames.length; i++) {
        for (let j = i + 1; j < state.keyFrames.length; j++) {
          if (
            stringifyStyles(state.keyFrames[i]) !==
            stringifyStyles(state.keyFrames[j])
          ) {
            ///
            if (resetN) return { ...initialState, reset: !state.reset };
            resetN = true;
            setTimeout(() => {
              resetN = false;
            }, 1000);
            toast.success("Keyframes has been reset");
            return { ...initialState, reset: !state.reset };
            ///
          }
        }
      }
      ///
      if (resetErrN) return;
      resetErrN = true;
      setTimeout(() => {
        resetErrN = false;
      }, 1000);
      toast.error("There's nothing to reset");
      ///
    },

    handleSetAnimation(state, { payload }) {
      if (!payload) return { ...initialState };

      return { ...payload };
    },
  },
});

export default customSlicer.reducer;
export const customActions = customSlicer.actions;
