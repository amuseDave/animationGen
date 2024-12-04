import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.css";
import "./styles/variables.css";
import "./styles/positions.css";
import "./styles/library-panel.css";
import "./styles/preview-panel.css";
import "./styles/controller-panel.css";
import "./styles/preview-controller.css";
import "./styles/navigation.css";
import App from "./App.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import CursorCanvas from "./CursorCanvas.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>

  <Provider store={store}>
    <div className="main-container">
      <CursorCanvas />
      <App />
    </div>
  </Provider>
  // </StrictMode>
);
