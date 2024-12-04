import CustomController from "./Custom/Layout";
import { useSelector } from "react-redux";

export default function MainController() {
  const type = useSelector((state) => state.ui.type);
  const isAnimating = useSelector((state) => state.ui.isAnimating);

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
      </div>
    )
  );
}
