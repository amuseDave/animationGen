import { Play, RotateCcw } from "lucide-react";

export default function PlayResetBtn() {
  return (
    <>
      <Play
        size={32}
        className={`text-purple-500 ${
          true ? "cursor-not-allowed opacity-25" : "cursor-pointer"
        } -order-1`}
      />
      <RotateCcw
        size={32}
        strokeWidth={1.5}
        className={`text-purple-900 ${
          true ? "cursor-not-allowed opacity-25" : "cursor-pointer"
        }`}
      />
    </>
  );
}
