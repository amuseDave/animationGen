import { Book, ChevronDown } from "lucide-react";

export default function Featured() {
  return (
    <>
      <div className="flex gap-2 text-main-t-gray">
        <Book size={22} /> <h1>Featured library</h1>{" "}
        <ChevronDown size={22} className="ml-auto" />
      </div>
    </>
  );
}
