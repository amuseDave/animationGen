import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../store/uiSlicer";
import { customActions } from "../../../store/customSlicer";
import { customActionsDD } from "../../../store/customDDSlicer";

export default function UpdateCanvasState() {
  const animations = useSelector((state) => state.animations.custom.animations);
  const curIndex = useSelector((state) => state.animations.custom.curIndex);
  const isDefault = useSelector((state) => state.animations.custom.isDefault);
  const customDefault = useSelector((state) => state.animations.custom.default);

  const dispatch = useDispatch();
  useEffect(() => {
    setCurAnimation();
  }, [curIndex, isDefault]);

  function setCurAnimation() {
    if (!isDefault) {
      dispatch(
        customActions.handleSetAnimation(animations[curIndex].animation)
      );
      dispatch(
        customActionsDD.handleSetAnimation(animations[curIndex].animationDD)
      );
      dispatch(uiActions.handleDragDrop(animations[curIndex].isDragDrop));
    } else {
      dispatch(customActions.handleSetAnimation(customDefault.animation));
      dispatch(customActionsDD.handleSetAnimation(customDefault.animationDD));
      dispatch(uiActions.handleDragDrop(customDefault.isDragDrop));
    }
  }
  return null;
}
