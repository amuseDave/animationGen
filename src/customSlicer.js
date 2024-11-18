import { createSlice } from "@reduxjs/toolkit";
import { getBoxWidthHeight, getSquareSize } from "./utils/handleCanvas";

const initialState = {
  square: {
    x: 0,
    y: 0,
    animations: [null],
  },
  position: "center",
  isHovered: false,
  isHolding: false,
  offsetX: 0,
  offsetY: 0,
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
      const squareSize = getSquareSize(width);

      console.log(state.square.animations.length);
      if (state.square.animations.length > 20) {
        console.log("start");
      } else if (state.position === "center") {
        state.square.x = width / 2 - squareSize / 2;
        state.square.y = height / 2 - squareSize / 2;
      } else if (state.position === "center-top") {
        state.square.x = width / 2 - squareSize / 2;
        state.square.y = height / 2 - squareSize;
      } else if (state.position === "center-bottom") {
        state.square.x = width / 2 - squareSize / 2;
        state.square.y = height / 2;
      } else if (state.position === "center-left") {
        state.square.x = width / 2 - squareSize;
        state.square.y = height / 2 - squareSize / 2;
      } else if (state.position === "center-right") {
        state.square.x = width / 2;
        state.square.y = height / 2 - squareSize / 2;
      }
      if (state.square.animations.length > 20) {
        console.log("good shit");
      } else {
        state.square.animations = [];
        state.square.animations[0] = { x: state.square.x, y: state.square.y };
      }
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
      state.isHolding = false;
    },
    handleMovement(state, { payload: { x, y, width, height } }) {
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
      state.square.animations.push({ x: state.square.x, y: state.square.y });
    },
  },
});

export default customSlicer.reducer;
export const customActions = customSlicer.actions;
