import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../uiSlicer";

export default function MicroInteractions() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(uiActions.changeMicro());
  });
  return <div>Micro Interactions</div>;
}
