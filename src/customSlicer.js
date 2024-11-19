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
    animations: [],
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
    handleUpdateAnimationsPositions(state, { payload: { width, height } }) {
      if (!state.isAnimationCreated) return;
      state.square.animations.forEach((animation) => {
        const widthRatio = width / animation.canvasWidth;
        const heightRatio = height / animation.canvasHeight;

        animation.x *= widthRatio;
        animation.y *= heightRatio;

        animation.canvasWidth = width;
        animation.canvasHeight = height;
      });

      state.square.x = state.square.animations[0].x;
      state.square.y = state.square.animations[0].y;
    },
    handlePositions(state, actions) {
      const { action, position, width, height } = actions.payload;
      if (action === "update-positions") {
        if (state.isHolding) return;
        if (state.isAnimating) {
          state.isAnimating = false;
          return;
        }

        /////////////
        const squareSize = getSquareSize(width);
        const { x, y } = getSquarePos({
          position: state.position,
          squareSize,
          height,
          width,
        });
        state.square.x = x;
        state.square.y = y;
        state.square.animations[0] = {
          x: state.square.x,
          y: state.square.y,
          canvasWidth: width,
          canvasHeight: height,
        };

        ///////////
      } else if (action === "set-position") {
        state.position = position;
      }
    },
    handleHover(state, actions) {
      state.isHovered = actions.payload;
    },
    handleHolding(state, actions) {
      if (!state.isHovered) return;
      state.isHolding = actions.payload;
    },
    handleSetOffSets(state, { payload: { offsetX, offsetY } }) {
      state.offsetX = offsetX;
      state.offsetY = offsetY;
    },
    handleSetAnimationMovement(state, { payload: { x, y, width, height } }) {
      if (!state.isHolding) return;

      const diffX = x - state.offsetX;
      const diffY = y - state.offsetY;

      const squareSize = getSquareSize(width);
      const { boxWidth, boxHeight } = getBoxWidthHeight(width, height);

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

      state.square.animations.push({
        x: state.square.x,
        y: state.square.y,
        canvasWidth: width,
        canvasHeight: height,
      });
    },
    handleAnimation(state, actions) {
      const { isAnimating, action } = actions.payload;

      switch (action) {
        case "set": {
          if (!state.isHolding) return;
          state.isAnimationCreated =
            state.square.animations.length < 50 ? null : true;
          break;
        }
        case "reset": {
          state.square.animations = [];
          state.isAnimationCreated = false;
          state.isAnimating = false;
          break;
        }
        case "setAnimating": {
          if (!state.isAnimationCreated) return;
          state.isAnimating = isAnimating;
          break;
        }
        default:
          break;
      }
    },
  },
});

export default customSlicer.reducer;
export const customActions = customSlicer.actions;
