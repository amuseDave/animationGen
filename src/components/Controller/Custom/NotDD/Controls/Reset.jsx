import { useDispatch } from "react-redux";
import { customActions } from "../../../../../store/customSlicer";
import { Power } from "lucide-react";
export default function Reset() {
  const dispatch = useDispatch();

  function handleReset() {
    dispatch(customActions.handleReset());
  }

  return (
    <Power
      onClick={handleReset}
      size={38}
      className="mx-auto mt-2 text-center text-green-200"
    />
  );
}
