import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlicer";

export default function MicroInteractions() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(uiActions.handleTypeChange("micro"));
  }, []);
  return <div>Micro Interactions</div>;
}
