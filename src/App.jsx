import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Custom from "./pages/Custom";
import FeaturedAnimations from "./pages/FeaturedAnimations";
import MicroInteractions from "./pages/MicroInteractions";
import Error from "./pages/Error.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
  return <RouterProvider router={route} />;
}
