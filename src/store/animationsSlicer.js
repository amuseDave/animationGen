import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  animationsAlert: null,
  custom: {
    curIndex: 0,
    animations: [
      { name: "Animation Name", animation: "", animationDD: "", id: uuidv4() },
    ],
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
      return { ...pulseWaveAnimations };
    },

    handleUpdateCustom(state, { payload: { index, action, value } }) {
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
    handleAddRemoveCustom(state, { payload: { action } }) {
      if (action === "add") {
        if (state.custom.animations.length > 4) {
          state.animationsAlert = "limit";
          return;
        }
        const id = uuidv4();

        let name = "Animation Name";
        const existingNames = new Set(
          state.custom.animations.map((a) => a.name)
        );
        let existCount = 0;
        while (existingNames.has(name)) {
          existCount++;
          name = `Animation Name(${existCount})`;
        }

        state.custom.animations.push({
          name,
          animation: "",
          animationDD: "",
          id,
        });

        const index = state.custom.animations.findIndex(
          (animation) => id === animation.id
        );
        state.custom.curIndex = index;
        state.animationsAlert = "add";
      }

      if (action === "remove") {
        state.custom.animations.splice(state.custom.curIndex, 1);
        state.animationsAlert = "remove";
      }

      localStorage.setItem("pulsewave-animations", JSON.stringify(state));
    },
    handleAnimationsAlert(state, { payload }) {
      state.animationsAlert = payload;
    },
  },
});

export default animationsSlicer.reducer;

export const animationActions = animationsSlicer.actions;
