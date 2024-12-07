import { useSelector } from "react-redux";
import LibrarySVG from "../../../assets/svgs/save.svg";

export default function Loading() {
  const animationsAlert = useSelector(
    (state) => state.animations.animationsAlert
  );

  return animationsAlert ? (
    <div className="logo-container-loader"></div>
  ) : (
    <img src={LibrarySVG} className="logo-container-cloud" />
  );
}
