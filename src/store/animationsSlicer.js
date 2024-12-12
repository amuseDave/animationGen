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

const id = uuidv4();

const initialState = {
  animationsAlert: null,
  copyLink: "",
  custom: {
    animationNames: [{ name: "Your Animation", id, isShared: false }],
    curIndex: 0,
    animations: [
      {
        name: "Your Animation",
        animation: "",
        animationDD: "",
        id,
        isDragDrop: false,
        isShared: false,
      },
    ],
  },
  featured: {
    animationNames: [{ name: "Astronaut", id: uuidv4() }],
    activeIndex: 0,
    animations: [],
  },
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

      if (state.custom.animations[0].isShared) {
        state.custom.animations.splice(0, 1);
        state.custom.animationNames.splice(0, 1);
        state.custom.curIndex !== 0 && state.custom.curIndex--;
      }
    },
    handleSetCustomShared(state, { payload: { sharedAnimation } }) {
      if (!sharedAnimation) return;
      const id = uuidv4();
      state.custom.animations.unshift({
        ...sharedAnimation,
        isShared: true,
        id,
      });
      state.custom.animationNames.unshift({
        id,
        name: sharedAnimation.name,
        isShared: true,
      });
      state.custom.curIndex = 0;
    },
    handleClearAnimationAlert(state) {
      state.animationsAlert = null;
    },
    handleCustomUpdateName(state, { payload }) {
      state.custom.animationNames[state.custom.curIndex].name = payload;
      state.custom.animations[state.custom.curIndex].name = payload;

      setCustomLocalStorage(state.custom);

      if (!state.animationsAlert) state.animationsAlert = "update";
    },
    handleCustomUpdateIndex(state, { payload }) {
      state.custom.curIndex = payload;
      setCustomLocalStorage(state.custom);
    },
    handleUpdateCustom(state, { payload: { index, action, value } }) {
      switch (action) {
        case "ndd":
          state.custom.animations[index].animation = value;
          if (!state.animationsAlert) state.animationsAlert = "update";
          break;
        case "dd":
          state.custom.animations[index].animationDD = value;
          if (!state.animationsAlert) state.animationsAlert = "update";
          break;
        case "drag-drop":
          state.custom.animations[index].isDragDrop = value;
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

        let name = "Animation Name";
        let name2 = name;

        const existingNames = new Set(animations.map((a) => a.name));

        let existCount = 0;
        while (existingNames.has(name2)) {
          existCount++;
          name2 = `${name}(${existCount})`;
        }

        animations.push({
          animation: "",
          animationDD: "",
          isDragDrop: false,
          name: name2,
          id,
          isShared: false,
        });
        state.custom.animationNames.push({ name: name2, id, isShared: false });

        const index = animations.findIndex((animation) => id === animation.id);
        state.custom.curIndex = index;
        setCustomLocalStorage(state.custom);

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
        state.custom.animationNames.splice(index, 1);
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

      link = btoa(
        JSON.stringify(state.custom.animations[state.custom.curIndex])
      );

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
    handleAddSharing(state) {
      if (state.custom.animationNames.length > 5) {
        if (limitN) return;
        limitN = true;
        setTimeout(() => {
          limitN = false;
        }, 1000);

        toast.error("Limit  reached!");
        return;
      }
      state.custom.animations[state.custom.curIndex].isShared = false;
      state.custom.animationNames[state.custom.curIndex].isShared = false;

      setCustomLocalStorage(state.custom);
      toast.success("Shared animation has been saved!");
    },

    handleFeaturedIndex(state, { payload }) {
      state.featured.activeIndex = payload;
    },
  },
});

export default animationsSlicer.reducer;

export const animationActions = animationsSlicer.actions;
