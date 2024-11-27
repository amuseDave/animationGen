import { Play } from "lucide-react";

export default function HandleAnimation({ handleAnimation }) {
  return (
    <>
      <Play
        className="absolute text-white bc bottom-16 bg-slate-900"
        size={32}
        onClick={handleAnimation}
      />
    </>
  );
}
