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
  positionDD: "cc",
  position: "cc",
  isHovered: false,
  isHolding: false,
  offsetX: 0,
  offsetY: 0,
  isAnimationCreated: false,
  isDragDrop: true,
};

const customSlicer = createSlice({
  name: "custom-animations",
  initialState,
  reducers: {
    handleUpdateAnimationsPositions(
      state,
      { payload: { width, height, zoomLevel } }
    ) {
      if (!state.isAnimationCreated) return;

      const currentBoxWidth = (width / 4) * zoomLevel;
      const currentBoxHeight = (width / 3) * zoomLevel;
      const currentBoxX = width / 2 - currentBoxWidth / 2;
      const currentBoxY = height / 2 - currentBoxHeight / 2;
      const prevCanvasWidth = state.square.animations[0].canvasWidth;
      const prevCanvasHeight = state.square.animations[0].canvasHeight;
      const prevZoomLevel = state.square.animations[0].zoomLevel;
      const prevBoxWidth = (prevCanvasWidth / 4) * prevZoomLevel;
      const prevBoxHeight = (prevCanvasWidth / 3) * prevZoomLevel;
      const prevBoxX = prevCanvasWidth / 2 - prevBoxWidth / 2;
      const prevBoxY = prevCanvasHeight / 2 - prevBoxHeight / 2;

      state.square.animations.forEach((animation) => {
        const relativeX = (animation.x - prevBoxX) / prevBoxWidth;
        const relativeY = (animation.y - prevBoxY) / prevBoxHeight;

        // Recalculate the square's position using the current dashed box dimensions
        animation.x = currentBoxX + relativeX * currentBoxWidth;
        animation.y = currentBoxY + relativeY * currentBoxHeight;
      });

      state.square.animations[0].zoomLevel = zoomLevel;
      state.square.animations[0].canvasHeight = height;
      state.square.animations[0].canvasWidth = width;

      state.square.x = state.square.animations[0].x;
      state.square.y = state.square.animations[0].y;
    },
    handleSetPositions(state, actions) {
      const { actionType, width, height, zoomLevel, type } = actions.payload;

      if (actionType === "update-position") {
        if (state.isAnimationCreated) return;

        const squareSize = getSquareSize(width, zoomLevel);
        const { x, y } = getSquarePos({
          position: state.positionDD,
          squareSize,
          height,
          width,
          zoomLevel,
        });

        state.square.x = x;
        state.square.y = y;

        state.square.animations[0] = {
          x,
          y,
          canvasWidth: width,
          canvasHeight: height,
          zoomLevel,
        };
      } else if (actionType === "set-position") state.positionDD = type;
    },
    handleHover(state, actions) {
      state.isHovered = actions.payload;
    },
    handleHolding(state, actions) {
      if (!state.isHovered) return;
      state.isHolding = actions.payload;
    },
    handleSetOffSets(state, { payload: { offsetX, offsetY } }) {
      if (!state.isHovered) return;
      state.offsetX = offsetX;
      state.offsetY = offsetY;
    },
    handleSetAnimationMovement(
      state,
      { payload: { x, y, width, height, zoomLevel } }
    ) {
      if (!state.isHolding) return;

      const diffX = x - state.offsetX;
      const diffY = y - state.offsetY;

      const squareSize = getSquareSize(width, zoomLevel);
      const { boxWidth, boxHeight } = getBoxWidthHeight(width, zoomLevel);

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
      });
    },
    handleAnimation(state, actions) {
      const { action } = actions.payload;

      switch (action) {
        case "set-animation": {
          if (!state.isHolding) return;
          state.isHolding = false;
          if (state.square.animations.length < 50) {
            state.square.animations = [];
            state.isAnimationCreated = null;
          } else {
            state.isHovered = false;
            state.isAnimationCreated = true;
          }
          break;
        }
        case "animation-alert-end":
          state.isAnimationCreated = false;
          break;
        case "reset-animation": {
          state.square.animations = [];
          state.isAnimationCreated = false;
          break;
        }

        default:
          break;
      }
    },
    handleDragDrop(state, { payload }) {
      state.isDragDrop = payload;
    },
  },
});

export default customSlicer.reducer;
export const customActions = customSlicer.actions;
