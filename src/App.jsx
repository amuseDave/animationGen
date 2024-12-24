import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main.jsx";
import Error from "./pages/Error.jsx";
import FeaturedAnimations from "./pages/FeaturedAnimations.jsx";
import Custom from "./pages/Custom.jsx";
import MicroInteractions from "./pages/MicroInteractions.jsx";

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
  return <RouterProvider router={route} />;
}

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Main from "./pages/Main.jsx";
// import Error from "./pages/Error.jsx";
// import { lazy, Suspense } from "react";

// const FeaturedAnimations = lazy(() => import("./pages/FeaturedAnimations.jsx"));
// const Custom = lazy(() => import("./pages/Custom.jsx"));
// const MicroInteractions = lazy(() => import("./pages/MicroInteractions.jsx"));

// const route = createBrowserRouter([
//   {
//     path: "/",
//     element: <Main />,
//     errorElement: <Error />,

//     children: [
//       {
//         index: true,
//         element: <Custom />,
//       },
//       { path: "featured-animations", element: <FeaturedAnimations /> },
//       { path: "micro-interactions", element: <MicroInteractions /> },
//     ],
//   },
// ]);

// export default function App() {
//   return (
//     <Suspense fallback={<>Loading</>}>
//       <RouterProvider router={route} />
//     </Suspense>
//   );
// }
