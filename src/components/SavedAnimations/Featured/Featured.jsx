import { ChevronDown } from "lucide-react";

export default function Featured({ svg }) {
  return (
    <>
      <div className="flex gap-2 text-main-t-gray">
        <img src={svg} /> <h1>Featured library</h1>{" "}
        <ChevronDown size={22} className="ml-auto" />
      </div>
    </>
  );
}
