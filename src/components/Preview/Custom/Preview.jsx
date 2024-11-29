import { useDispatch, useSelector } from "react-redux";
import Loader from "../Static/Loader";
import Playback from "./Playback";
import { stringifyStyles } from "../../../utils/helper";
import { uiActions } from "../../../store/uiSlicer";
import { customActions } from "../../../store/customSlicer";
import { useEffect, useRef } from "react";

export default function Preview() {
  const dispatch = useDispatch();
  const squareEl = useRef();
  const squareAnimation = useRef();
  const timeoutId = useRef();

  const isAnimating = useSelector((state) => state.ui.isAnimating);
  const isResizing = useSelector((state) => state.ui.isResizing);
  const zoomLevel = useSelector((state) => state.ui.zoomLevel);

  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);
  const animationFunction = useSelector(
    (state) => state.custom.animationFunction
  );
  const keyFrames = useSelector((state) => state.custom.keyFrames);
  const duration = useSelector((state) => state.custom.duration);
  const curKF = keyFrames[activeKeyFrame];

  const dashedBoxStyles = {
    width: `${24 * zoomLevel}dvw`,
    height: `${18 * zoomLevel}dvw`,
  };
  const size = (window.innerWidth / 100) * 7 * zoomLevel;
  const boxStyles = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: curKF.color,
    opacity: curKF.opacity,
    transform: `translate(${curKF.translateX}%, ${curKF.translateY}%) rotate(${curKF.rotate}deg) scale(${curKF.scale})`,
    left: curKF.left,
    bottom: curKF.bottom,
    top: curKF.top,
    right: curKF.right,
    position: "absolute",
  };

  // Check validity of animation, and set to isAnimating or alert
  function handleAnimation() {
    if (isAnimating) {
      dispatch(uiActions.handleIsAnimating(false));
      squareAnimation.current.cancel();
      return;
    }

    for (let i = 0; i < keyFrames.length; i++) {
      for (let j = i + 1; j < keyFrames.length; j++) {
        if (stringifyStyles(keyFrames[i]) !== stringifyStyles(keyFrames[j])) {
          dispatch(uiActions.handleIsAnimating(true));
          dispatch(
            customActions.handleKeyFrame({ action: "switch", value: 0 })
          );
          return;
        }
      }
    }
    dispatch(
      customActions.handleKeyFrame({
        action: "validation",
        value: "same-styles",
      })
    );
  }

  // Create & Play Animation
  useEffect(() => {
    if (!isAnimating) return;

    const styles = keyFrames.map((keyFrame) => {
      return {
        opacity: keyFrame.opacity,
        backgroundColor: keyFrame.color,
        left: keyFrame.left,
        top: keyFrame.top,
        transform: `translate(${keyFrame.translateX}%, ${keyFrame.translateY}%) scale(${keyFrame.scale}) rotate(${keyFrame.rotate}deg)`,
      };
    });
    squareAnimation.current = squareEl.current.animate(styles, {
      duration: duration * 1000,
      easing: animationFunction,
      iterations: 1,
    });

    if (timeoutId.current) clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      dispatch(uiActions.handleIsAnimating(false));
    }, duration * 1000);

    return () => {
      dispatch(uiActions.handleIsAnimating(false));
    };
  }, [isAnimating]);
  return (
    <>
      <section
        style={dashedBoxStyles}
        className={`border-2 border-dashed border-zinc-600 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 z-10 ${
          isResizing && "hidden"
        }`}
      >
        <div
          ref={squareEl}
          id="square"
          style={boxStyles}
          className={`rounded-xl`}
        ></div>
      </section>
      {isResizing && <Loader />}
      <Playback handleAnimation={handleAnimation} isAnimating={isAnimating} />
    </>
  );
}
