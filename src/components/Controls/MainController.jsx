import { useSelector, shallowEqual } from "react-redux";
import CustomController from "./CustomController/CustomController";

export default function MainController() {
  const { type } = useSelector(
    (state) => ({
      type: state.ui.type,
    }),
    shallowEqual
  );

  return (
    <div className="relative px-3 py-5 rounded-lg bg-zinc-900">
      {type === "featured" && <></>}
      {type === "micro" && <></>}
      {type === "custom" && <CustomController />}
    </div>
  );
}
