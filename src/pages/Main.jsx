import { Outlet } from "react-router-dom";

import Navigation from "../components/Navigation/Navigation.jsx";
import SavedAnimations from "../components/SavedAnimations/SavedAnimations.jsx";

import PreviewLayout from "../components/Preview/Layout.jsx";
import MainController from "../components/Controller/Layout.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlicer.js";
import DefaultCanvas from "../components/Preview/Static/DefaultCanvas.jsx";
import CursorCanvas from "../components/CursorCanvas.jsx";

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
      <CursorCanvas />
      <DefaultCanvas />
      <main
        className={`m-5 duration-200 min-h-[86dvh] relative z-10 grid grid-cols-[260px_1fr_260px]`}
      >
        <SavedAnimations />
        <div className="relative h-full">
          <Navigation />
          <PreviewLayout />
        </div>
        <MainController />
      </main>

      <footer>
        <Outlet />
      </footer>
    </>
  );
}
