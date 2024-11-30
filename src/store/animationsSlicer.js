import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

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
        JSON.parse(localStorage.getItem("pulsewave-animations")) ||
        state.custom;
      state.custom = pulseWaveAnimations;
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
          break;
        case "drag-drop":
          state.custom.animations[index].isDragDrop = value;

          break;
      }
      state.animationsAlert = "update";

      localStorage.setItem(
        "pulsewave-animations",
        JSON.stringify(state.custom)
      );
    },
    handleAddRemoveCustom(state, { payload: { action, index } }) {
      const { animations, curIndex } = state.custom;
      if (action === "add") {
        if (animations.length > 4) {
          toast.error("Limit Has Been Reached!");
          return;
        }
        const id = uuidv4();

        let name = "Animation Name";
        const existingNames = new Set(animations.map((a) => a.name));
        let existCount = 0;
        while (existingNames.has(name)) {
          existCount++;
          name = `Animation Name(${existCount})`;
        }

        animations.push({
          name,
          animation: "",
          animationDD: "",
          id,
        });

        const index = animations.findIndex((animation) => id === animation.id);
        state.custom.curIndex = index;
        toast.success("Canvas Created!");
      }

      if (action === "remove") {
        if (animations.length < 2) {
          toast.error("Can't delete last!");
          return;
        }
        const curId = animations[curIndex].id;
        animations.splice(index, 1);
        toast.success("Canvas Deleted!");
        const newIndex = animations.findIndex(
          (animation) => animation.id === curId
        );
        state.custom.curIndex = newIndex > -1 ? newIndex : 0;
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
