import { Pause, Play } from "lucide-react";

export default function HandleAnimation({ handleAnimation, isAnimating }) {
  return (
    <>
      {isAnimating ? (
        <Pause
          className="absolute text-white bc bottom-16 bg-slate-900"
          size={32}
          onClick={handleAnimation}
        />
      ) : (
        <Play
          className="absolute text-white bc bottom-16 bg-slate-900"
          size={32}
          onClick={handleAnimation}
        />
      )}
    </>
  );
}
