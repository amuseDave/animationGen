import { useDispatch } from "react-redux";
import { customActions } from "../../../../store/customSlicer";
import { Power } from "lucide-react";
export default function Reset() {
  const dispatch = useDispatch();

  function handleReset() {
    dispatch(customActions.handleReset());
  }

  return (
    <div className="preview-controller-box-item">
      <Power onClick={handleReset} size={24} strokeWidth={1.3} />
    </div>
  );
}
