import { customActions } from "../../../../store/customSlicer.js";
import { useDispatch } from "react-redux";

export default function ChangeKeyFrame({ svg, type, className }) {
  const dispatch = useDispatch();

  function handleNextPrev() {
    dispatch(customActions.handleNextPrevKF(type));
  }

  return (
    <div
      onClick={handleNextPrev}
      className={`preview-controller-box-item ${className}`}
    >
      <img src={svg} />
    </div>
  );
}
