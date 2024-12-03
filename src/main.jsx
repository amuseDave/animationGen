import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "./styles/navigation.css";
import "./styles/positions.css";
import App from "./App.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import CursorCanvas from "./CursorCanvas.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>

  <Provider store={store}>
    <div className="duration-200 min-h-dvh transition-color bg-main-bg">
      <CursorCanvas />
      <App />
    </div>
  </Provider>
  // </StrictMode>
);
