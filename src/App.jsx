import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import Custom from "./pages/Custom";
import FeaturedAnimations from "./pages/FeaturedAnimations";
import MicroInteractions from "./pages/MicroInteractions";
import ErrorElement from "./pages/ErrorElement";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorElement />,

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
  return <RouterProvider router={route} />;
}
