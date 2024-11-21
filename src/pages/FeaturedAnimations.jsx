import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlicer";

export default function FeaturedAnimations() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(uiActions.handleTypeChange("featured"));
  }, []);

  return <div>Featured animations</div>;
}
