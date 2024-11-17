// import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../uiSlicer";

export default function Custom() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(uiActions.changeCustom());
  });

  return <div>No Custom animations</div>;
}
