// import { useSearchParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/uiSlicer";
import { useSearchParams } from "react-router-dom";
import { validateAnimationObject } from "../utils/helper";
import { customActions } from "../store/customSlicer";

export default function Custom() {
  const timeoutId = useRef();
  const timeoutIdDD = useRef();

  const isDragDrop = useSelector((state) => state.ui.isDragDrop);
  const isChanging = useSelector((state) => state.ui.isChanging);

  const stateDD = useSelector((state) => state.customDD);
  const state = useSelector((state) => state.custom);

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  useEffect(() => {
    // Handle Initial Load Link State for Custom Animations
    if (isChanging) {
      dispatch(uiActions.handleIsAnimationChanging(false));
      const animation = searchParams.get("animation");
      if (!animation) return;
      const custom = JSON.parse(atob(animation));

      // Check and Update state from shared/switched link DD
      if (!isDragDrop) {
        validateAnimationObject(custom) &&
          dispatch(customActions.handleSetSharedAnimation(custom));
        return;
      }
      // Check and Update state from shared/switched link NDD
    }

    // Handle Link Update for sharing every 0.5s
    if (!isDragDrop) {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => {
        searchParams.set("animation", btoa(JSON.stringify(state)));
        setSearchParams(searchParams);
      }, 500);
    }
    // Handle Link Update for sharing every 0.5s
    if (isDragDrop) {
      if (timeoutIdDD.current) clearTimeout(timeoutIdDD.current);
      timeoutIdDD.current = setTimeout(() => {
        searchParams.set("animation", btoa(JSON.stringify(stateDD)));
        setSearchParams(searchParams);
      }, 500);
    }
  }, [isDragDrop, state, stateDD]);

  useEffect(() => {
    dispatch(uiActions.handleTypeChange("custom"));

    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      if (timeoutIdDD.current) clearTimeout(timeoutIdDD.current);
    };
  }, []);

  return null;
}
