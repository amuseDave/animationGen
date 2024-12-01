import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

let limitN;
let createdN;
let deleteErrN;
let deleteN;
let linkN;
let linkErrN;

function setCustomLocalStorage(data) {
  localStorage.setItem("pulsewave-animations", JSON.stringify(data));
}

const initialState = {
  animationsAlert: null,
  copyLink: "",
  custom: {
    isDefault: true,
    default: {
      animation: "",
      animationDD: "",
      name: "New",
      isDragDrop: false,
    },
    curIndex: 0,
    animations: [
      {
        name: "Your Animation",
        animation: "",
        animationDD: "",
        id: uuidv4(),
        isDragDrop: false,
      },
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
    handleSetCustomDefault(state, { payload }) {
      state.custom.isDefault = payload;
    },
    handleClearAnimationAlert(state) {
      state.animationsAlert = null;
    },
    handleCustomUpdateName(state, { payload }) {
      if (state.custom.isDefault) {
        state.custom.default.name = payload;
      } else {
        state.custom.animations[state.custom.curIndex].name = payload;
      }
      setCustomLocalStorage(state.custom);

      if (!state.animationsAlert) state.animationsAlert = "update";
    },
    handleCustomUpdateIndex(state, { payload }) {
      state.custom.curIndex = payload;
      state.custom.isDefault = false;
      setCustomLocalStorage(state.custom);
    },
    handleUpdateCustom(
      state,
      { payload: { index, action, value, isDefault } }
    ) {
      switch (action) {
        case "ndd":
          if (isDefault) state.custom.default.animation = value;
          else state.custom.animations[index].animation = value;
          if (!state.animationsAlert) state.animationsAlert = "update";
          break;
        case "dd":
          if (isDefault) state.custom.default.animationDD = value;
          else state.custom.animations[index].animationDD = value;
          if (!state.animationsAlert) state.animationsAlert = "update";
          break;
        case "drag-drop":
          if (isDefault) state.custom.default.isDragDrop = value;
          else state.custom.animations[index].isDragDrop = value;
          break;
      }

      setCustomLocalStorage(state.custom);
    },
    handleAddRemoveCustom(state, { payload: { action, index } }) {
      const { animations, curIndex } = state.custom;
      if (action === "add") {
        if (animations.length > 4) {
          ///
          if (limitN) return;
          limitN = true;
          setTimeout(() => {
            limitN = false;
          }, 1000);
          toast.error("Limit Has Been Reached!");
          ///
          return;
        }

        const id = uuidv4();

        let name =
          state.custom.default.name === "New"
            ? "Animation Name"
            : state.custom.default.name;
        let name2 = name;

        const existingNames = new Set(animations.map((a) => a.name));

        let existCount = 0;
        while (existingNames.has(name2)) {
          existCount++;
          name2 = `${name}(${existCount})`;
        }

        animations.push({
          ...state.custom.default,
          name: name2,
          id,
        });

        const index = animations.findIndex((animation) => id === animation.id);
        state.custom.curIndex = index;
        state.custom.isDefault = false;
        state.custom.default = { ...initialState.custom.default };
        setCustomLocalStorage(state.custom);

        ///
        if (createdN) return;
        createdN = true;
        setTimeout(() => {
          createdN = false;
        }, 1000);
        toast.success("Canvas Created!");
        ///
      }

      if (action === "remove") {
        if (animations.length < 2) {
          ///
          if (deleteErrN) return;
          deleteErrN = true;
          setTimeout(() => {
            deleteErrN = false;
          }, 1000);
          toast.error("Can't delete last!");
          ///
          return;
        }
        const curId = animations[curIndex].id;
        animations.splice(index, 1);
        const newIndex = animations.findIndex(
          (animation) => animation.id === curId
        );
        state.custom.curIndex = newIndex > -1 ? newIndex : 0;
        setCustomLocalStorage(state.custom);

        ///
        if (deleteN) return;
        deleteN = true;
        setTimeout(() => {
          deleteN = false;
        }, 1000);
        toast.success("Canvas Deleted!");
        ///
      }
    },

    handleSharingCustom(state) {
      if (linkErrN || linkN) return;

      let link;

      if (state.custom.isDefault) {
        link = btoa(JSON.stringify(state.custom.default));
      } else {
        link = btoa(
          JSON.stringify(state.custom.animations[state.custom.curIndex])
        );
      }

      link = window.location.origin + "/?animation=" + link;

      navigator.clipboard
        .writeText(link)
        .then(() => {
          if (linkN) return;
          setTimeout(() => {
            linkN = false;
          }, 1000);
          toast.success("Link has been copied!");
        })
        .catch(() => {
          linkErrN = true;
          setTimeout(() => {
            linkErrN = false;
          }, 1000);
          toast.error("Couldn't copy the link. Please copy it manually.");
        });

      state.copyLink = link;
    },
  },
});

export default animationsSlicer.reducer;

export const animationActions = animationsSlicer.actions;
