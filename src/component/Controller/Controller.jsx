import { useSelector } from "react-redux";
import PositionSelector from "./PositionSelector";

export default function Controller() {
  const { type } = useSelector((state) => state.ui);
  return (
    <div className="flex flex-col items-center px-3 py-5 bg-sky-50">
      {type === "custom" && <PositionSelector />}
    </div>
  );
}
