import { uiActions } from "../../../../store/uiSlicer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useCallback } from "react";
import {
  drawTranslateCanvas,
  getXYCanvas,
} from "../../../../utils/handleCursorCanvas";

let isHover = false;
let isHolding = false;

export default function Canvas() {
  const keyFrames = useSelector((state) => state.custom.keyFrames);
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);

  const dispatch = useDispatch();
  const canvasEl = useRef();
  const ctx = useRef();

  const { translateX, translateY } = keyFrames[activeKeyFrame];

  useEffect(() => {
    ctx.current = canvasEl.current.getContext("2d");
  }, []);

  const handleMove = useCallback((offsetX, offsetY, tX, tY) => {
    console.log(tX, tY, offsetX, offsetY);

    if (isHolding) {
      return;
    }

    if (
      offsetX >= tX - 10 &&
      offsetX <= tX + 10 &&
      offsetY >= tY - 10 &&
      offsetY <= tY + 10
    ) {
      dispatch(uiActions.handleCursor("move"));
      isHover = true;
    } else {
      dispatch(uiActions.handleCursor("default"));
      isHover = false;
    }
  }, []);

  const handleDown = useCallback(() => {
    if (!isHover) return;
    isHolding = true;
    dispatch(uiActions.handleCursor("grab"));
  }, []);

  const handleUp = useCallback(() => {
    if (!isHolding) return;
    isHolding = false;
    if (isHover) dispatch(uiActions.handleCursor("move"));
    else dispatch(uiActions.handleCursor("default"));
  }, []);

  useEffect(() => {
    const canvas = canvasEl.current;
    const converted = getXYCanvas(translateX, translateY);

    drawTranslateCanvas(converted.x, converted.y, ctx.current);

    function handleMoveHandler(e) {
      const { offsetX, offsetY } = e;
      handleMove(offsetX, offsetY, converted.x, converted.y);
    }

    function handleDownHandler(e) {
      const { offsetX, offsetY } = e;
      handleDown(offsetX, offsetY);
    }

    function handleUpHandler() {
      handleUp();
    }

    canvas.addEventListener("mouseup", handleUp);
    canvas.addEventListener("mousedown", handleDownHandler);
    canvas.addEventListener("mousemove", handleMoveHandler);
    return () => {
      canvas.removeEventListener("mousemove", handleMoveHandler);
      canvas.removeEventListener("mousedown", handleDownHandler);
      canvas.removeEventListener("mouseup", handleUp);
    };
  }, [translateX, translateY]);
  return (
    <div className="flex items-center gap-2">
      <canvas
        ref={canvasEl}
        width={200}
        height={200}
        className="bg-slate-950"
      ></canvas>
    </div>
  );
}
