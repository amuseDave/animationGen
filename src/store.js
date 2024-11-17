import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlicer.js";
import customReducer from "./customSlicer.js";

const store = configureStore({
  reducer: { ui: uiReducer, custom: customReducer },
});
export default store;
