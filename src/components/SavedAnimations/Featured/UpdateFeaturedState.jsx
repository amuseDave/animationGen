import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { featuredActions } from "../../../store/featuredSlicer";

export default function UpdateFeaturedState() {
  const activeIndex = useSelector(
    (state) => state.animations.featured.activeIndex
  );
  const animations = useSelector(
    (state) => state.animations.featured.animations
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(featuredActions.handleSetAnimation(animations[activeIndex]));
  }, [activeIndex]);
  return null;
}
