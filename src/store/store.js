import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlicer.js";
import customDDReducer from "./customDDSlicer.js";
import customReducer from "./customSlicer.js";

const store = configureStore({
  reducer: { ui: uiReducer, customDD: customDDReducer, custom: customReducer },
});
export default store;
