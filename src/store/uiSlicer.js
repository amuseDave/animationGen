import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: null,
  isModalOpen: false,
  zoomLevel: 1,
  isResizing: false,
  isAnimating: false,
  isDragDrop: false,
  isInitial: true,

  cursor: "default",
};

const uiSlicer = createSlice({
  name: "ui",
  initialState,
  reducers: {
    handleZoomChange(state, { payload }) {
      switch (payload) {
        case "zoom-in":
          if (state.zoomLevel >= 2) return;
          state.zoomLevel += 0.1;
          break;
        case "zoom-out":
          if (state.zoomLevel <= 0.5) return;
          state.zoomLevel -= 0.1;
          break;
        case "reset":
          if (state.zoomLevel === 1) return;
          state.zoomLevel = 1;
          break;
        default:
          break;
      }

      state.zoomLevel = +state.zoomLevel.toFixed(2);
    },
    handleIsAnimating(state, { payload }) {
      state.isAnimating = payload;
    },
    handleDragDrop(state, { payload }) {
      state.isDragDrop = payload;
    },

    handleCursor(state, { payload }) {
      state.cursor = payload;
    },

    handleTypeChange(state, { payload }) {
      state.type = payload;
    },
    handleResize(state, { payload }) {
      state.isResizing = payload;
    },
    handleInitial(state, { payload }) {
      state.isInitial = payload;
    },
    handleModal(state, { payload }) {
      state.isModalOpen = payload;
    },
  },
});

export default uiSlicer.reducer;

export const uiActions = uiSlicer.actions;
