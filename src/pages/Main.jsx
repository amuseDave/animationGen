import Navigation from "../components/Navigation/Navigation.jsx";
import SavedAnimations from "../components/SavedAnimations/Layout.jsx";
import PreviewLayout from "../components/Preview/Layout.jsx";
import MainController from "../components/Controller/Layout.jsx";
import CopyModal from "../components/Copy-Modal/Layout.jsx";

import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlicer.js";

import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "../components/Preview/Static/ToastProvider.jsx";
import ShareBtn from "../components/Controller/Static/ShareBtn.jsx";
import Savebtn from "../components/Controller/Static/Savebtn.jsx";

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
      <main
        className={`p-6 min-h-dvh relative z-10 grid grid-cols-[280px_1fr_280px]`}
      >
        <section className="relative flex flex-col gap-3">
          <SavedAnimations />
        </section>

        <Outlet />

        <div className="relative overflow-hidden">
          <ToastProvider />
          <Navigation />
          <PreviewLayout />
          <ShareBtn />
          <Savebtn />
        </div>
        <MainController />
      </main>

      <CopyModal />
    </>
  );
}
