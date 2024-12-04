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
      <div className="controller-container">
        <div
          className={`controller-container-not-allowed ${
            isAnimating
              ? "cursor-not-allowed"
              : "opacity-0 pointer-events-none invisible"
          }`}
        ></div>
        {type === "custom" && <CustomController />}
        {type === "featured" && <></>}
        {type === "micro" && <></>}

        <div className="controller-copy">
          <Copy size={32} onClick={handleModal} />
        </div>
      </div>
    )
  );
}
