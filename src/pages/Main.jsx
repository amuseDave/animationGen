import Navigation from "../components/Navigation/Navigation.jsx";
import SavedAnimations from "../components/SavedAnimations/Layout.jsx";
import PreviewLayout from "../components/Preview/Layout.jsx";
import MainController from "../components/Controller/Layout.jsx";
import CopyModal from "../components/Copy-Modal/Layout.jsx";
import PreviewControls from "../components/Preview-Controls/Layout.jsx";

import ZoomControls from "../components/Preview/Static/ZoomControls.jsx";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlicer.js";

import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "../components/Preview/Static/ToastProvider.jsx";

import PlayingAnimationAlert from "../components/Preview/Static/PlayingAlert.jsx";

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
      <main className={`main-grid`}>
        <section className="library-total-panel-container">
          <SavedAnimations />
        </section>

        <Outlet />

        <div className="middle-container">
          <Navigation />
          <div className="preview-container">
            <PreviewLayout />
          </div>
          <div className="preview-controls-container">
            <PreviewControls />
          </div>
          <PlayingAnimationAlert />
          <ToastProvider /> <ZoomControls />
        </div>
        <MainController />
      </main>

      <CopyModal />
    </>
  );
}
