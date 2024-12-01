import { useDispatch } from "react-redux";
import { Share2 } from "lucide-react";
import { animationActions } from "../../../store/animationsSlicer";

export default function ShareBtn({ type }) {
  const dispatch = useDispatch();

  function handleSharing() {
    if (type === "custom") dispatch(animationActions.handleSharingCustom());
    else if (type === "featured") dispatch();
    else if (type === "micro") dispatch();
  }

  return (
    <Share2
      onClick={handleSharing}
      size={32}
      className="absolute left-4 bottom-2 text-main-t-active"
    />
  );
}
