import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/uiSlicer";
import { animationActions } from "../store/animationsSlicer";
import { useSearchParams } from "react-router-dom";

//
let idx;

/**
 * Control with @var idx & @var innerInitial unecessary local storage saves if switching between tabs or changing index
 *
 * */

/**
 * Handle Initial render for shared link
 * Handle saving changed animations to local storage
 * Handle loading state of small icon
 */

export default function Custom() {
  const [innerInitial, setInnerInitial] = useState(true);

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
        animationActions.handleSetCustomShared({
          sharedAnimation: custom,
          isDefault: true,
        })
      );
    }

    return () => {
      setInnerInitial(true);
    };
  }, []);

  // Set local storage of saved animations DD, nDD, iDD.
  useEffect(() => {
    // Save keyframe animation
    if (!isDragDrop && !isInitial && curIndex === idx) {
      if (innerInitial) {
        setInnerInitial(false);
        return;
      }

      if (timeoutId.current) clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => {
        dispatch(
          animationActions.handleUpdateCustom({
            action: "ndd",
            index: curIndex,
            value: state,
          })
        );
      }, 400);
    }
  }, [state]);

  useEffect(() => {
    if (!isInitial && curIndex === idx) {
      if (innerInitial) {
        setInnerInitial(false);
        return;
      }

      if (timeoutIdDD.current) clearTimeout(timeoutIdDD.current);
      timeoutIdDD.current = setTimeout(() => {
        dispatch(
          animationActions.handleUpdateCustom({
            action: "dd",
            index: curIndex,
            value: stateDD,
          })
        );
      }, 400);
    }
  }, [isAnimationCreatedDD]);

  useEffect(() => {
    if (!isInitial && curIndex === idx) {
      if (innerInitial) {
        setInnerInitial(false);
        return;
      }
      dispatch(
        animationActions.handleUpdateCustom({
          action: "drag-drop",
          index: curIndex,
          value: isDragDrop,
        })
      );
    }
  }, [isDragDrop]);
  // END
  useEffect(() => {
    if (!isInitial && curIndex === idx) {
      if (innerInitial) {
        setInnerInitial(false);
        return;
      } else {
        if (notificationTimeoutId.current)
          clearTimeout(notificationTimeoutId.current);

        notificationTimeoutId.current = setTimeout(() => {
          dispatch(animationActions.handleClearAnimationAlert());
        }, 800);
      }
    }

    idx = curIndex;
  }, [state, isAnimationCreatedDD]);
  return null;
}
