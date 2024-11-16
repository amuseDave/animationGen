import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import Custom from "./pages/Custom";
import FeaturedAnimations from "./pages/FeaturedAnimations";
import MicroInteractions from "./pages/MicroInteractions";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "custom",
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
