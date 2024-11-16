import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "../component/Navigation/Navigation.jsx";

import SavedAnimations from "../component/SavedAnimations/SavedAnimations.jsx";

export default function MainLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/custom");
    }
  });

  return (
    <main
      className={`pt-10 duration-200 min-h-dvh transition-color bg-background`}
    >
      <Navigation />

      <div className="grid grid-cols-[180px_3fr_1fr] grid-rows-2 mt-10 px-2">
        <SavedAnimations />
        <Outlet />
      </div>
    </main>
  );
}
