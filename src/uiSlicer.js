import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDark:
    JSON.parse(localStorage.getItem("isDark")) === undefined
      ? true
      : JSON.parse(localStorage.getItem("isDark")),
  type: "custom",
  isReset: false,
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

    changeCustom(state) {
      state.type = "custom";
    },
    changeFeatured(state) {
      state.type = "featured";
    },
    changeMicro(state) {
      state.type = "micro";
    },
    setReset(state) {
      state.isReset = true;
    },
    restartReset(state) {
      state.isReset = false;
    },
  },
});

export default uiSlicer.reducer;

export const uiActions = uiSlicer.actions;
