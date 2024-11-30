import ZoomControls from "./Static/ZoomControls.jsx";
import { useSelector } from "react-redux";
import CustomPreview from "./Custom/PreviewLayout.jsx";
import PlayingAnimationAlert from "./Static/PlayingAlert.jsx";

import AlertsLayout from "./AlertsLayout.jsx";
import CustomName from "./Custom/AnimationName.jsx";

export default function Layout() {
  const type = useSelector((state) => state.ui.type);

  return (
    type && (
      <>
        <ZoomControls />
        <div className="relative">
          <PlayingAnimationAlert />
          <div className="relative h-[800px] overflow-hidden">
            {type === "custom" && <CustomPreview />}
            {type === "featured" && <h2>Featured animations</h2>}
            {type === "micro" && <h2>Micro animations</h2>}
          </div>
        </div>

        {type === "custom" && <CustomName />}
        {type === "featured" && <></>}
        {type === "micro" && <></>}

        <AlertsLayout />
      </>
    )
  );
}
