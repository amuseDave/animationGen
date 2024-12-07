import { ChevronDown } from "lucide-react";

export default function Micro({ svg }) {
  return (
    <>
      <div className="flex gap-2 text-main-t-gray">
        <img src={svg} /> <h1>Micro library</h1>
        <ChevronDown size={22} className="ml-auto" />
      </div>
    </>
  );
}
