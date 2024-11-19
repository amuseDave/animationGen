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
    updatePosition(state, actions) {
      state.position = actions.payload;
    },
    setStartPos(state, { payload: { width, height } }) {
      if (state.isHolding) return;
      if (state.isAnimating) {
        state.isAnimating = false;
        return;
      }

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
    resetAnimation(state) {
      state.square.animations = [];
      state.isAnimationCreated = false;
    },
    handleHover(state, actions) {
      state.isHovered = actions.payload;
    },
    handleHolding(state, actions) {
      if (!state.isHovered) return;
      state.isHolding = actions.payload;
    },
    setOffSets(state, { payload: { offsetX, offsetY } }) {
      state.offsetX = offsetX;
      state.offsetY = offsetY;
    },
    handleAnimationMovement(state, { payload: { x, y, width, height } }) {
      if (!state.isHolding) return;

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
    setAnimation(state) {
      if (!state.isHolding) return;
      if (state.square.animations.length < 50) {
        state.isAnimationCreated = null;
      } else {
        state.isAnimationCreated = true;
      }
    },
    handleIsAnimating(state, actions) {
      if (!state.isAnimationCreated) return;
      state.isAnimating = actions.payload;
    },
  },
});

export default customSlicer.reducer;
export const customActions = customSlicer.actions;
