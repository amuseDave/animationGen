import { Outlet } from "react-router-dom";

import Navigation from "../component/Navigation/Navigation.jsx";

import SavedAnimations from "../component/SavedAnimations/SavedAnimations.jsx";
import MainPreview from "../component/MainPreview/MainPreview.jsx";
import Controller from "../component/Controller/Controller.jsx";

export default function MainLayout() {
  return (
    <main
      className={`pt-10 duration-200 min-h-dvh transition-color bg-background`}
    >
      <Navigation />

      <div className="grid grid-cols-[200px_1fr_300px] gap-x-3 mt-10 px-3">
        <SavedAnimations />
        <MainPreview />
        <Controller />
      </div>

      <footer>
        <Outlet />
      </footer>
    </main>
  );
}
