import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../uiSlicer";

export default function FeaturedAnimations() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(uiActions.changeFeatured());
  });

  return <div>Featured animations</div>;
}
