import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  square: {
    x: 0,
    y: 0,
    squareSize: 0,
    animation: [null],
  },
  squareDash: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    lineDash: 0,
    lineWidth: 0,
  },
  canvasSize: {
    width: 0,
    height: 0,
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

    setSizes(state, { payload: { width, height } }) {
      if (state.isHolding) return;

      state.canvasSize.width = width;
      state.canvasSize.height = height;

      const boxWidth = width / 3;
      const boxHeight = width / 4;
      state.squareDash.width = boxWidth;
      state.squareDash.height = boxHeight;
      state.squareDash.x = width / 2 - boxWidth / 2;
      state.squareDash.y = height / 2 - boxHeight / 2;
      state.squareDash.lineDash = width / 50;
      state.squareDash.lineWidth = width / 450;

      const square = width / 10;
      state.square.squareSize = square;

      console.log(state.square.animation[1]?.x);

      if (state.square.animation[0]?.x !== undefined) {
        state.square.x = state.square.animation[0].x;
        state.square.y = state.square.animation[0].y;
      } else if (state.position === "center") {
        state.square.x = width / 2 - square / 2;
        state.square.y = height / 2 - square / 2;
      } else if (state.position === "center-top") {
        state.square.x = width / 2 - square / 2;
        state.square.y = height / 2 - square;
      } else if (state.position === "center-bottom") {
        state.square.x = width / 2 - square / 2;
        state.square.y = height / 2;
      } else if (state.position === "center-left") {
        state.square.x = width / 2 - square;
        state.square.y = height / 2 - square / 2;
      } else if (state.position === "center-right") {
        state.square.x = width / 2;
        state.square.y = height / 2 - square / 2;
      }
      if (!state.square.animation[0]) {
        state.square.animation[0] = { x: state.square.x, y: state.square.y };
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
    handleMovement(state, { payload: { x, y } }) {
      if (!state.isHolding) return;
      const diffX = x - state.offsetX;
      const diffY = y - state.offsetY;

      state.square.x =
        diffX + state.square.squareSize <= state.squareDash.x ||
        diffX >= state.squareDash.x + state.squareDash.width
          ? state.square.x
          : diffX;

      state.square.y =
        diffY + state.square.squareSize <= state.squareDash.y ||
        diffY >= state.squareDash.y + state.squareDash.height
          ? state.square.y
          : diffY;

      if (
        Math.abs(
          state.square.x -
            state.square.animation[state.square.animation.length - 1].x
        ) > 5
      )
        state.square.animation.push({ x: state.square.x, y: state.square.y });

      if (
        Math.abs(
          state.square.y -
            state.square.animation[state.square.animation.length - 1].y
        ) > 5
      )
        state.square.animation.push({ x: state.square.x, y: state.square.y });
    },
  },
});

export default customSlicer.reducer;
export const customActions = customSlicer.actions;
