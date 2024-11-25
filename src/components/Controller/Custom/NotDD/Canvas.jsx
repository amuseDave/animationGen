import { uiActions } from "../../../../store/uiSlicer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useCallback } from "react";
import {
  drawTranslateCanvas,
  getXYCanvas,
  getXYTranslate,
} from "../../../../utils/handleCursorCanvas";
import { customActions } from "../../../../store/customSlicer";

let isHover = false;
let isHolding = false;

export default function Canvas() {
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);
  const translateX = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].translateX
  );
  const translateY = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].translateY
  );
  const position = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].position
  );
  const cursor = useSelector((state) => state.ui.cursor);

  const converted = getXYCanvas(translateX, translateY);

  const dispatch = useDispatch();
  const canvasEl = useRef();
  const ctx = useRef();

  useEffect(() => {
    ctx.current = canvasEl.current.getContext("2d");

    return () => {
      dispatch(uiActions.handleCursor("default"));
      isHolding = false;
      isHover = false;
    };
  }, []);

  useEffect(() => {
    drawTranslateCanvas(converted.x, converted.y, ctx.current);
  }, [translateX, translateY]);

  // Handle isHover, and isHolding moving
  const handleMove = useCallback((offsetX, offsetY, tX, tY) => {
    if (isHolding) {
      const outsideX = offsetX - 10 / 2 <= 0 || offsetX + 10 + 5 >= 200;
      const outsideY = offsetY - 10 / 2 <= 0 || offsetY + 10 + 5 >= 200;

      const { x, y } = getXYTranslate(offsetX, offsetY);

      dispatch(
        customActions.handleSetPosition({
          x: outsideX ? null : x,
          y: outsideY ? null : y,
          action: "set-translate",
        })
      );

      return;
    }

    const isHovered =
      offsetX >= tX - 12 &&
      offsetX <= tX + 12 &&
      offsetY >= tY - 12 &&
      offsetY <= tY + 12;

    if (isHovered && isHover) return;

    if (isHovered) {
      dispatch(uiActions.handleCursor("move"));
      isHover = true;
    } else {
      dispatch(uiActions.handleCursor("default"));
      isHover = false;
    }
  }, []);

  // handle holding
  const handleDown = useCallback(() => {
    if (!isHover) return;
    isHolding = true;
    dispatch(uiActions.handleCursor("grab"));
  }, []);

  // handle setting if isHolding
  const handleUp = useCallback(() => {
    if (!isHolding) return;
    if (isHover) dispatch(uiActions.handleCursor("move"));
    else dispatch(uiActions.handleCursor("default"));
    isHolding = false;
  }, []);

  // Handle translate canvas events
  useEffect(() => {
    const canvas = canvasEl.current;

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

    canvas.addEventListener("mouseup", handleUpHandler);
    canvas.addEventListener("mousedown", handleDownHandler);
    canvas.addEventListener("mousemove", handleMoveHandler);

    return () => {
      canvas.removeEventListener("mousemove", handleMoveHandler);
      canvas.removeEventListener("mousedown", handleDownHandler);
      canvas.removeEventListener("mouseup", handleUpHandler);
    };
  }, [isHolding, activeKeyFrame, position]);
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
