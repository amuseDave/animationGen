import { createSlice } from "@reduxjs/toolkit";
import {
  getBoxWidthHeight,
  getSquareSize,
  getSquarePos,
} from "./utils/handleCanvas";

const initialState = {
  square: {
    x: 0,
    y: 0,
    animations: [null],
  },
  position: "cc",
  isHovered: false,
  isHolding: false,
  offsetX: 0,
  offsetY: 0,
  isAnimationCreated: false,
  isAnimating: false,
  isResizing: false,
};

const customSlicer = createSlice({
  name: "custom-animations",
  initialState,
  reducers: {
    setOffSets(state, { payload: { offsetX, offsetY } }) {
      state.offsetX = offsetX;
      state.offsetY = offsetY;
    },

    updatePosition(state, actions) {
      state.position = actions.payload;
    },

    setStartPos(state, { payload: { width, height } }) {
      if ((state.isAnimating || state.isHolding) && !state.isResizing) return;

      const squareSize = getSquareSize(width);

      const { x, y } = getSquarePos({
        position: state.position,
        squareSize,
        height,
        width,
      });

      state.square.x = x;
      state.square.y = y;

      state.square.animations[0] = { x: state.square.x, y: state.square.y };
    },
    setResizing(state) {
      if (state.isAnimating) state.isResizing = true;
    },
    resetResizing(state) {
      if (state.isAnimating) state.isResizing = false;
    },

    setHover(state) {
      state.isHovered = true;
    },
    removeHover(state) {
      state.isHovered = false;
    },
    setHolding(state) {
      state.isHolding = true;
    },
    removeHolding(state) {
      if (!state.isHolding) return;
      state.isHolding = false;
      if (state.square.animations.length < 50) {
        state.isAnimationCreated = null;
      } else {
        state.isAnimationCreated = true;
        state.isHovered = false;
      }
    },
    resetAnimation(state) {
      state.square.animations = [];
      state.isAnimationCreated = false;
    },
    handleMovement(state, { payload: { x, y, width, height } }) {
      if (!state.isHolding || state.isAnimating) return;

      const diffX = x - state.offsetX;
      const diffY = y - state.offsetY;

      const squareSize = getSquareSize(width);
      const { boxWidth, boxHeight } = getBoxWidthHeight(width);

      const boxX = width / 2 - boxWidth / 2;
      const boxY = height / 2 - boxHeight / 2;

      state.square.x =
        diffX + squareSize <= boxX || diffX >= boxX + boxWidth
          ? state.square.x
          : diffX;

      state.square.y =
        diffY + squareSize <= boxY || diffY >= boxY + boxHeight
          ? state.square.y
          : diffY;

      state.square.animations.push({ x: state.square.x, y: state.square.y });
    },
  },
});

export default customSlicer.reducer;
export const customActions = customSlicer.actions;
