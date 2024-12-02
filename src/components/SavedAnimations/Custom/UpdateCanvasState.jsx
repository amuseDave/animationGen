import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../store/uiSlicer";
import { customActions } from "../../../store/customSlicer";
import { customActionsDD } from "../../../store/customDDSlicer";

export default function UpdateCanvasState() {
  const animations = useSelector((state) => state.animations.custom.animations);
  const curIndex = useSelector((state) => state.animations.custom.curIndex);

  const dispatch = useDispatch();
  useEffect(() => {
    setCurAnimation();
  }, [curIndex]);

  function setCurAnimation() {
    dispatch(customActions.handleSetAnimation(animations[curIndex].animation));
    dispatch(
      customActionsDD.handleSetAnimation(animations[curIndex].animationDD)
    );
    dispatch(uiActions.handleDragDrop(animations[curIndex].isDragDrop));
  }
  return null;
}
