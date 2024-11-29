// import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/uiSlicer";
// import { useSearchParams } from "react-router-dom";
import { validateAnimationObject } from "../utils/helper";
import { customActions } from "../store/customSlicer";
import { animationActions } from "../store/animationsSlicer";

export default function Custom() {
  const [isInitial, setIsInitial] = useState(true);

  const timeoutId = useRef();
  const timeoutIdDD = useRef();

  const isDragDrop = useSelector((state) => state.ui.isDragDrop);

  const isAnimationCreatedDD = useSelector(
    (state) => state.customDD.isAnimationCreatedDD
  );
  const stateDD = useSelector((state) => state.customDD);
  const state = useSelector((state) => state.custom);

  const curIndex = useSelector((state) => state.animations.custom.curIndex);

  // const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  useEffect(() => {
    // Handle Initial Load Link State for Custom Animations
    if (isInitial) {
      setIsInitial(false);
      // const animation = searchParams.get("animation");
      // if (!animation) return;
      // const custom = JSON.parse(atob(animation));
      // // Check and Update state from shared/switched link DD
      // if (!custom.isDragDrop) {
      //   validateAnimationObject(custom) &&
      //     dispatch(customActions.handleSetSharedAnimation(custom));
      //   dispatch(uiActions.handleDragDrop(false));
      // } else if (custom.isDragDrop) {
      //   dispatch(uiActions.handleDragDrop(true));
      //   // Check and Update state from shared/switched link NDD
      // }
    }

    // Save keyframe animation
    if (!isDragDrop && !isInitial) {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => {
        dispatch(
          animationActions.handleUpdateCustom({
            action: "ndd",
            index: curIndex,
            value: btoa(JSON.stringify(state)),
          })
        );
      }, 400);
    }
  }, [state]);

  // Save animation to the DD
  useEffect(() => {
    if (isInitial) return;

    if (timeoutIdDD.current) clearTimeout(timeoutIdDD.current);
    timeoutIdDD.current = setTimeout(() => {
      dispatch(
        animationActions.handleUpdateCustom({
          action: "dd",
          index: curIndex,
          value: btoa(JSON.stringify(stateDD)),
        })
      );
    }, 100);
  }, [isAnimationCreatedDD]);

  useEffect(() => {
    if (isInitial) return;
    dispatch(
      animationActions.handleUpdateCustom({
        action: "drag-drop",
        index: curIndex,
        value: isDragDrop,
      })
    );
  }, [isDragDrop]);

  useEffect(() => {
    dispatch(uiActions.handleTypeChange("custom"));

    return () => {
      // if (timeoutId.current) clearTimeout(timeoutId.current);
      // if (timeoutIdDD.current) clearTimeout(timeoutIdDD.current);
    };
  }, []);

  return null;
}
