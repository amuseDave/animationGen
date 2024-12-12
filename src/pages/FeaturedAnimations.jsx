import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/uiSlicer";
import { useSearchParams } from "react-router-dom";
import { animationActions } from "../store/animationsSlicer";
import { featuredActions } from "../store/featuredSlicer";

export default function FeaturedAnimations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const isInitial = useSelector((state) => state.ui.isInitial);

  useEffect(() => {
    if (isInitial) {
      dispatch(uiActions.handleInitial(false));
    }

    dispatch(uiActions.handleTypeChange("featured"));
  }, []);

  useEffect(() => {
    if (isInitial) {
      // handle link shared
      const animation = searchParams.get("animation");
      if (!animation) return;
      setSearchParams({});
    }
  }, []);

  return null;
}
