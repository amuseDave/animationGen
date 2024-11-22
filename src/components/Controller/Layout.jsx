import CustomController from "./Custom/Layout";
import { useSelector } from "react-redux";

export default function MainController() {
  const type = useSelector((state) => state.ui.type);
  return (
    <div className="relative px-3 py-5 text-center text-pink-600 rounded-lg bg-zinc-900">
      <h1 className="pb-2 text-2xl text-center border-b-2 border-b-pink-100">
        Custom Controller
      </h1>
      {type === "custom" && <CustomController />}
      {type === "featured" && <></>}
      {type === "micro" && <></>}
    </div>
  );
}
