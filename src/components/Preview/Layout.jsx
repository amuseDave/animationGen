import ZoomControls from "./Static/ZoomControls.jsx";
import CustomAlerts from "./Custom/AlertsLayout.jsx";
import { useSelector } from "react-redux";
import CustomPreview from "./Custom/PreviewLayout.jsx";
import PlayingAnimationAlert from "./Static/PlayingAlert.jsx";
import { AnimatePresence } from "framer-motion";
import ResetAlert from "./Static/ResetAlert.jsx";

export default function Layout() {
  const type = useSelector((state) => state.ui.type);

  return (
    <>
      <ZoomControls />
      <div className="relative">
        <PlayingAnimationAlert />
        <div className="h-[700px]">
          {type === "custom" && <CustomPreview />}
          {type === "featured" && <h2>Featured animations</h2>}
          {type === "micro" && <h2>Micro animations</h2>}
        </div>
      </div>

      <div className="absolute z-20 right-4 bottom-4">
        <AnimatePresence>
          {type === "custom" && <CustomAlerts key="custom" />}

          <ResetAlert key="reset" />
        </AnimatePresence>
      </div>
    </>
  );
}
