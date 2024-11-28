// import { useSearchParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/uiSlicer";
import { useSearchParams } from "react-router-dom";
import { validateAnimationObject } from "../utils/helper";
import { customActions } from "../store/customSlicer";

let initialCustom;

export default function Custom() {
  const timeoutId = useRef();
  const timeoutIdDD = useRef();

  const isDragDrop = useSelector((state) => state.ui.isDragDrop);

  const stateDD = useSelector((state) => state.customDD);
  const state = useSelector((state) => state.custom);

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!initialCustom) {
      initialCustom = true;
      const animation = searchParams.get("animation");
      if (!animation) return;

      const custom = JSON.parse(atob(animation));

      if (!isDragDrop) {
        validateAnimationObject(custom) &&
          dispatch(customActions.handleSetSharedAnimation(custom));

        return;
      }
    }

    if (!isDragDrop) {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => {
        searchParams.set("animation", btoa(JSON.stringify(state)));
        setSearchParams(searchParams);
      }, 500);
    }

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
  }, []);

  return <></>;
}
