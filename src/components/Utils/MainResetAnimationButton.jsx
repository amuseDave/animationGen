import { Rotate3D } from "lucide-react";

export default function ResetAnimationBtn({
  handleResetAnimation,
  active = true,
}) {
  return (
    <button
      onClick={handleResetAnimation}
      className={`
    animation-btn text-pink-100 bg-pink-950 right-1
    ${active && "cursor-not-allowed opacity-25"}`}
    >
      Reset Animation <Rotate3D size={24} className="text-pink-600" />
    </button>
  );
}
