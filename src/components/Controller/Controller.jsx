import { useSelector } from "react-redux";
import CustomController from "./Custom/Controller";

export default function MainController() {
  const type = useSelector((state) => state.ui.type);

  return (
    <div className="relative px-3 py-5 text-center text-pink-600 rounded-lg bg-zinc-900">
      {type === "custom" && <CustomController />}
      {type === "featured" && <></>}
      {type === "micro" && <></>}
    </div>
  );
}
