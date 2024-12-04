import { CloudDownload } from "lucide-react";
import { useSelector } from "react-redux";

export default function Loading() {
  const animationsAlert = useSelector(
    (state) => state.animations.animationsAlert
  );

  return animationsAlert ? (
    <div className="logo-container-loader"></div>
  ) : (
    <CloudDownload className="logo-container-cloud" />
  );
}
