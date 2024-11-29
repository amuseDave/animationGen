import { CloudDownload } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { animationActions } from "../../../store/animationsSlicer";

export default function Loading() {
  const dispatch = useDispatch();
  const [isBlock, setIsBlock] = useState(false);
  const animationsAlert = useSelector(
    (state) => state.animations.animationsAlert
  );

  useEffect(() => {
    if (animationsAlert !== "update") return;
    dispatch(animationActions.handleAnimationsAlert(null));

    if (isBlock) return;
    setIsBlock(true);
    setTimeout(() => {
      setIsBlock(false);
    }, 500);
  }, [animationsAlert]);

  return isBlock ? (
    <div className="w-5 h-5 ml-auto border-2 rounded-full border-green-400/60 animate-spin border-t-transparent"></div>
  ) : (
    <CloudDownload className="ml-auto justify-self-end text-alert-t-success" />
  );
}
