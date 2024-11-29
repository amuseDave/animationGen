import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  custom: {
    curIndex: 0,
    animations: [{ name: "Animation Name", animation: "", animationDD: "" }],
  },
  featured: [{ name: "any", animation: "" }],
  micro: [{ name: "sw", animation: "" }],
};

const animationsSlicer = createSlice({
  name: "animations",
  initialState,
  reducers: {
    getSavedAnimations(state) {
      const pulseWaveAnimations =
        JSON.parse(localStorage.getItem("pulsewave-animations")) || state;
      return { ...pulseWaveAnimations, initial: false };
    },

    updateCustom(state, { payload: { index, action, value } }) {
      switch (action) {
        case "ndd":
          state.custom.animations[index].animation = value;
          break;
        case "dd":
          state.custom.animations[index].animationDD = value;
          break;
        case "set-name":
          state.custom.animations[state.custom.curIndex].name = value;
          break;
        case "index":
          state.custom.curIndex = index;
      }

      localStorage.setItem("pulsewave-animations", JSON.stringify(state));
    },
  },
});

export default animationsSlicer.reducer;

export const animationActions = animationsSlicer.actions;
