import { Copy } from "lucide-react";
import { uiActions } from "../../store/uiSlicer";
import CustomController from "./Custom/Layout";
import { useDispatch, useSelector } from "react-redux";

export default function MainController() {
  const type = useSelector((state) => state.ui.type);
  const isAnimating = useSelector((state) => state.ui.isAnimating);
  const dispatch = useDispatch();

  function handleModal() {
    dispatch(uiActions.handleModal(true));
  }

  return (
    type && (
      <div
        className={`relative px-3 py-5 text-center rounded-2xl bg-controller-bg`}
      >
        <div
          className={`rounded-2xl absolute left-0 duration-500 top-0 transition-opacity w-full h-full bg-black/65 ${
            isAnimating
              ? "cursor-not-allowed z-[1000]"
              : "opacity-0 pointer-events-none"
          }`}
        ></div>
        {type === "custom" && <CustomController />}
        {type === "featured" && <></>}
        {type === "micro" && <></>}

        <div className="absolute text-main-t-active bottom-2 right-4">
          <Copy size={32} onClick={handleModal} />
        </div>
      </div>
    )
  );
}
