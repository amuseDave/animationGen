import { createSlice } from "@reduxjs/toolkit";
import {
  getBoxWidthHeight,
  getSquareSize,
  getSquarePos,
} from "../utils/handleCanvas";

const initialState = {
  square: {
    animations: [{ x: 0, y: 0 }],
    animationIndex: 0,
  },
  positionDD: "cc",
  position: "cc",
  isHovered: false,
  isHolding: false,
  offsetX: 0,
  offsetY: 0,
  isAnimationCreatedDD: false,
  isAnimationInitialCreatedDD: null,
};

const customSlicer = createSlice({
  name: "custom-animations-DD",
  initialState,
  reducers: {
    handleUpdateAnimationsPositions(
      state,
      { payload: { width, height, zoomLevel } }
    ) {
      if (!state.isAnimationCreatedDD) return;

      const prevCanvasWidth = state.square.animations[0].canvasWidth;
      const prevCanvasHeight = state.square.animations[0].canvasHeight;
      const prevZoomLevel = state.square.animations[0].zoomLevel;

      // Avoid unecessary calculations
      if (
        prevCanvasWidth === width &&
        prevCanvasHeight === height &&
        prevZoomLevel === zoomLevel
      ) {
        return;
      }

      const prevBoxWidth = (prevCanvasWidth / 4) * prevZoomLevel;
      const prevBoxHeight = (prevCanvasWidth / 3) * prevZoomLevel;
      const prevBoxX = prevCanvasWidth / 2 - prevBoxWidth / 2;
      const prevBoxY = prevCanvasHeight / 2 - prevBoxHeight / 2;

      const currentBoxWidth = (width / 4) * zoomLevel;
      const currentBoxHeight = (width / 3) * zoomLevel;
      const currentBoxX = width / 2 - currentBoxWidth / 2;
      const currentBoxY = height / 2 - currentBoxHeight / 2;

      // Recalculate the square's animations using the prev & current comparison
      state.square.animations.forEach((animation) => {
        const relativeX = (animation.x - prevBoxX) / prevBoxWidth;
        const relativeY = (animation.y - prevBoxY) / prevBoxHeight;

        animation.x = currentBoxX + relativeX * currentBoxWidth;
        animation.y = currentBoxY + relativeY * currentBoxHeight;
      });

      state.square.animations[0].zoomLevel = zoomLevel;
      state.square.animations[0].canvasHeight = height;
      state.square.animations[0].canvasWidth = width;
    },
    handleSetPositions(state, actions) {
      const { actionType, width, height, zoomLevel, type } = actions.payload;

      if (actionType === "update-position") {
        if (state.isAnimationCreatedDD) return;

        const squareSize = getSquareSize(width, zoomLevel);
        const { x, y } = getSquarePos({
          position: state.positionDD,
          squareSize,
          height,
          width,
          zoomLevel,
        });

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

      const xVal =
        diffX + squareSize <= boxX || diffX >= boxX + boxWidth
          ? state.square.animations[state.square.animationIndex].x
          : diffX;

      const yVal =
        diffY + squareSize <= boxY || diffY >= boxY + boxHeight
          ? state.square.animations[state.square.animationIndex].y
          : diffY;

      state.square.animations.push({
        x: xVal,
        y: yVal,
      });

      state.square.animationIndex++;
    },
    handleAnimation(state, actions) {
      const { action, animationIndex } = actions.payload;

      switch (action) {
        case "set-index": {
          state.square.animationIndex = animationIndex;
          break;
        }
        case "set-animation": {
          if (!state.isHolding) return;

          state.square.animationIndex = 0;
          state.isHolding = false;
          if (state.square.animations.length < 50) {
            state.square.animations = [{ x: 0, y: 0 }];
            state.isAnimationInitialCreatedDD = false;
          } else {
            state.isHovered = false;
            state.isAnimationCreatedDD = true;
            state.isAnimationInitialCreatedDD = true;
          }
          break;
        }
        case "animation-alert-end":
          state.isAnimationInitialCreatedDD = null;
          break;
        case "reset-animation": {
          state.square.animationIndex = 0;
          state.square.animations = [{ x: 0, y: 0 }];
          state.isAnimationCreatedDD = false;
          state.isAnimationInitialCreatedDD = null;
          break;
        }

        default:
          break;
      }
    },
  },
});

export default customSlicer.reducer;
export const customActionsDD = customSlicer.actions;
