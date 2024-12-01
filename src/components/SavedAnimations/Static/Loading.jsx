import { CloudDownload } from "lucide-react";
import { useSelector } from "react-redux";

export default function Loading() {
  const animationsAlert = useSelector(
    (state) => state.animations.animationsAlert
  );

  return animationsAlert ? (
    <div className="w-5 h-5 ml-auto border-2 rounded-full border-green-400/60 animate-spin border-t-transparent"></div>
  ) : (
    <CloudDownload className="ml-auto justify-self-end text-alert-t-success" />
  );
}
