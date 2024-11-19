import { RotateCcw } from "lucide-react";

export default function PreviewControls() {
  return (
    <div className="absolute z-10 border rounded-md bg-zinc-900 top-5 right-2 border-zinc-800">
      <div className="p-2 cursor-pointer">
        <RotateCcw size={18} className=" text-zinc-500" />
      </div>
    </div>
  );
}
