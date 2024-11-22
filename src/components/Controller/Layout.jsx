import CustomController from "./Custom/Layout";
import { useSelector } from "react-redux";

export default function MainController() {
  const type = useSelector((state) => state.ui.type);
  return (
    <div className="relative px-3 py-5 text-center rounded-2xl bg-emerald-950">
      {type === "custom" && <CustomController />}
      {type === "featured" && <></>}
      {type === "micro" && <></>}
    </div>
  );
}
