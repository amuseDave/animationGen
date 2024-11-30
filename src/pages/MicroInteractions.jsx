import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/uiSlicer";

export default function MicroInteractions() {
  const dispatch = useDispatch();
  const isInitial = useSelector((state) => state.ui.isInitial);

  useEffect(() => {
    if (isInitial) {
      dispatch(uiActions.handleInitial(false));
    }
    dispatch(uiActions.handleTypeChange("micro"));
  }, []);

  useEffect(() => {
    if (isInitial) {
      // handle link shared
    }
  }, []);
  return null;
}
