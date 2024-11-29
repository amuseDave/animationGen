import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlicer.js";
import customDDReducer from "./customDDSlicer.js";
import customReducer from "./customSlicer.js";
import animationReducer from "./animationsSlicer.js";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    customDD: customDDReducer,
    custom: customReducer,
    animations: animationReducer,
  },
});
export default store;
