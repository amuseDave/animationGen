import { Outlet } from "react-router-dom";

import Navigation from "../components/Navigation/Navigation.jsx";
import SavedAnimations from "../components/SavedAnimations/SavedAnimations.jsx";

import PreviewLayout from "../components/Preview/Layout.jsx";
import MainController from "../components/Controller/Layout.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlicer.js";
import DefaultCanvas from "../components/Preview/Static/DefaultCanvas.jsx";

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
    <>
      <DefaultCanvas />
      <main
        className={`p-6 min-h-dvh relative z-10 grid grid-cols-[280px_1fr_280px]`}
      >
        <SavedAnimations />
        <div className="relative overflow-hidden">
          <Navigation />
          <PreviewLayout />
        </div>
        <MainController />
      </main>

      <Outlet />
    </>
  );
}
