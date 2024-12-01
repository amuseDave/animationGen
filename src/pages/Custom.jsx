// import { useSearchParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/uiSlicer";
// import { useSearchParams } from "react-router-dom";
import { validateAnimationObject } from "../utils/helper";
import { customActions } from "../store/customSlicer";
import { animationActions } from "../store/animationsSlicer";
import { useSearchParams } from "react-router-dom";

export default function Custom() {
  const timeoutId = useRef();
  const timeoutIdDD = useRef();
  const notificationTimeoutId = useRef();

  const isDragDrop = useSelector((state) => state.ui.isDragDrop);
  const isInitial = useSelector((state) => state.ui.isInitial);

  const isAnimationCreatedDD = useSelector(
    (state) => state.customDD.isAnimationCreatedDD
  );
  const stateDD = useSelector((state) => state.customDD);
  const state = useSelector((state) => state.custom);

  const curIndex = useSelector((state) => state.animations.custom.curIndex);
  const isDefault = useSelector((state) => state.animations.custom.isDefault);

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(uiActions.handleTypeChange("custom"));
    if (isInitial) {
      dispatch(uiActions.handleInitial(false));
      const animation = searchParams.get("animation");
      if (!animation) return;

      setSearchParams({});
      const custom = JSON.parse(atob(animation));

      dispatch(
        animationActions.handleSetCustomDefault({
          sharedAnimation: custom,
          isDefault: true,
        })
      );
    }
  }, []);

  // Set local storage of saved animations DD, nDD, iDD. Default & Animations
  useEffect(() => {
    // Save keyframe animation
    if (!isDragDrop && !isInitial) {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => {
        dispatch(
          animationActions.handleUpdateCustom({
            action: "ndd",
            index: curIndex,
            value: state,
            isDefault,
          })
        );
      }, 400);
    }
  }, [state]);

  useEffect(() => {
    if (isInitial) return;

    if (timeoutIdDD.current) clearTimeout(timeoutIdDD.current);
    timeoutIdDD.current = setTimeout(() => {
      dispatch(
        animationActions.handleUpdateCustom({
          action: "dd",
          index: curIndex,
          value: stateDD,
          isDefault,
        })
      );
    }, 400);
  }, [isAnimationCreatedDD]);

  useEffect(() => {
    if (isInitial) return;
    dispatch(
      animationActions.handleUpdateCustom({
        action: "drag-drop",
        index: curIndex,
        value: isDragDrop,
        isDefault,
      })
    );
  }, [isDragDrop]);
  // END
  useEffect(() => {
    if (isInitial) return;
    if (notificationTimeoutId.current)
      clearTimeout(notificationTimeoutId.current);

    notificationTimeoutId.current = setTimeout(() => {
      dispatch(animationActions.handleClearAnimationAlert());
    }, 800);
  }, [state, isAnimationCreatedDD]);
  return null;
}
