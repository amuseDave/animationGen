import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDark:
    JSON.parse(localStorage.getItem("isDark")) === undefined
      ? true
      : JSON.parse(localStorage.getItem("isDark")),
  type: "custom",
  isReset: false,
  zoomLevel: 1,
  isResizing: false,
};

function changeTheme(state) {
  if (state.isDark) window.document.documentElement.classList.remove("light");
  else window.document.documentElement.classList.add("light");
}

changeTheme(initialState);

const uiSlicer = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isDark = !state.isDark;
      localStorage.setItem("isDark", JSON.stringify(state.isDark));
      changeTheme(state);
    },
    handleResetAnimationAlert(state, { payload }) {
      state.isReset = payload;
    },
    handleTypeChange(state, { payload }) {
      state.type = payload;
    },
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
    },
    handleResizing(state, { payload }) {
      state.isResizing = payload;
    },
  },
});

export default uiSlicer.reducer;

export const uiActions = uiSlicer.actions;
