import { Outlet } from "react-router-dom";

import Navigation from "../components/Navigation/Navigation.jsx";
import SavedAnimations from "../components/SavedAnimations/SavedAnimations.jsx";

import PreviewLayout from "../components/Preview/Layout.jsx";
import MainController from "../components/Controller/Controller.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlicer.js";

export default function MainLayout() {
  const dispatch = useDispatch();

  // Handle resize event for loading
  useEffect(() => {
    let isResizing = false;
    let timeoutIdResize;
    function handleResize() {
      if (timeoutIdResize) clearTimeout(timeoutIdResize);
      timeoutIdResize = setTimeout(() => {
        dispatch(uiActions.handleResize(false));
        isResizing = false;
      }, 200);
      if (isResizing) return;
      dispatch(uiActions.handleResize(true));
      isResizing = true;
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main
      className={`pt-10 duration-200 min-h-dvh transition-color bg-background`}
    >
      <Navigation />

      <div className="grid grid-cols-[200px_1fr_300px] gap-x-3 mt-10 px-3">
        <SavedAnimations />
        <PreviewLayout />
        <MainController />
      </div>

      <footer>
        <Outlet />
      </footer>
    </main>
  );
}
