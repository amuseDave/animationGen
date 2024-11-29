import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main.jsx";
import Custom from "./pages/Custom";
import FeaturedAnimations from "./pages/FeaturedAnimations";
import MicroInteractions from "./pages/MicroInteractions";
import Error from "./pages/Error.jsx";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { animationActions } from "./store/animationsSlicer.js";
import { uiActions } from "./store/uiSlicer.js";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,

    children: [
      {
        index: true,
        element: <Custom />,
      },
      { path: "featured-animations", element: <FeaturedAnimations /> },
      { path: "micro-interactions", element: <MicroInteractions /> },
    ],
  },
]);

export default function App() {
  const isInitial = useSelector((state) => state.ui.isInitial);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(animationActions.getSavedAnimations());
    dispatch(uiActions.handleInitial(false));
  }, []);

  return !isInitial && <RouterProvider router={route} />;
}
