import ZoomControls from "./Static/ZoomControls.jsx";
import { useSelector } from "react-redux";
import CustomPreview from "./Custom/PreviewLayout.jsx";
import PlayingAnimationAlert from "./Static/PlayingAlert.jsx";

import AlertsLayout from "./AlertsLayout.jsx";

export default function Layout() {
  const type = useSelector((state) => state.ui.type);

  return (
    <>
      <ZoomControls />
      <div className="relative">
        <PlayingAnimationAlert />
        <div className="h-[700px] relative overflow-hidden">
          {type === "custom" && <CustomPreview />}
          {type === "featured" && <h2>Featured animations</h2>}
          {type === "micro" && <h2>Micro animations</h2>}
        </div>
      </div>

      <AlertsLayout />
    </>
  );
}
