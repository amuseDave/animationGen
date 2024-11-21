// import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlicer";

export default function Custom() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(uiActions.handleTypeChange("custom"));
  }, []);

  return <div>No Custom animations</div>;
}
