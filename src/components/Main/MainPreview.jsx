import { shallowEqual, useSelector } from "react-redux";
import MainAlerts from "./MainAlerts.jsx";
import Loader from "../Utils/MainLoader.jsx";
import DefaultCanvas from "../Utils/MainCanvas.jsx";
import PreviewZoomControls from "../Utils/MainZoomControls.jsx";
import CustomPreview from "../Custom/CustomPreview.jsx";

export default function MainPreview() {
  const { type, isResizing } = useSelector((state) => {
    return { isResizing: state.ui.isResizing, type: state.ui.type };
  }, shallowEqual);

  return (
    <section className="relative h-[720px] overflow-hidden rounded-xl">
      <h2 className="absolute text-white top-5 left-5">Animation Name</h2>
      <PreviewZoomControls />

      {isResizing && <Loader />}
      {type === "custom" && <CustomPreview />}
      {type === "featured" && <h2>Featured animations</h2>}
      {type === "micro" && <h2>Micro animations</h2>}

      <MainAlerts />
      <DefaultCanvas />
    </section>
  );
}
