import { Play, RefreshCcw } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { uiActions } from "../../../../store/uiSlicer";
import { stringifyStyles, hexToRgba } from "../../../../utils/helper";
import { customActions } from "../../../../store/customSlicer";
import { toast } from "react-toastify";

let sameStylesNotification;

export default function HandleAnimation() {
  const dispatch = useDispatch();
  const isAnimating = useSelector((state) => state.ui.isAnimating);
  const keyFrames = useSelector((state) => state.custom.keyFrames);
  const duration = useSelector((state) => state.custom.duration);
  const animationFunction = useSelector(
    (state) => state.custom.animationFunction
  );

  const squareEl = useRef();
  const squareAnimation = useRef();
  const timeoutId = useRef();

  useEffect(() => {
    squareEl.current = document.getElementById("square");
  }, []);

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

    ///
    if (sameStylesNotification) return;
    sameStylesNotification = true;
    setTimeout(() => {
      sameStylesNotification = false;
    }, 1000);
    toast.error("Can't animate same styles");
    ///
  }

  useEffect(() => {
    if (!isAnimating) return;

    const styles = keyFrames.map((keyFrame) => {
      return {
        opacity: keyFrame.opacity,
        backgroundColor: hexToRgba(
          keyFrame.backgroundColor,
          keyFrame.bgOpacity
        ),
        color: hexToRgba(keyFrame.textColor, keyFrame.textOpacity),
        left: keyFrame.left,
        top: keyFrame.top,
        transform: `translate(${keyFrame.translateX}%, ${keyFrame.translateY}%) scaleX(${keyFrame.scaleX}) scaleY(${keyFrame.scaleY}) rotate(${keyFrame.rotate}deg)`,
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
      {isAnimating ? (
        <RefreshCcw
          className="text-white bc bg-slate-900"
          size={32}
          onClick={handleAnimation}
        />
      ) : (
        <Play
          className="text-white bc bg-slate-900"
          size={32}
          onClick={handleAnimation}
        />
      )}
    </>
  );
}
