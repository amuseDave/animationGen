import { uiActions } from "../../../../store/uiSlicer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useCallback, useState } from "react";
import { drawTranslateCanvas } from "../../../../utils/handleCursorCanvas";
import { customActions } from "../../../../store/customSlicer";
import {
  getOffsetXY,
  handleOutsideXYCalc,
  handleTranslateInputs,
} from "../../../../utils/helper";
import { throttle } from "lodash";

let isHover = false;
let isHolding = false;

export default function Canvas() {
  const dispatch = useDispatch();
  const canvasEl = useRef();
  const ctx = useRef();

  const [innerChanged, setInnerChanged] = useState(false);
  const [isReleased, setIsReleased] = useState(true);

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

  // Update translateXY with inputs onChange
  function handleInputsHandler(e, type) {
    const val = handleTranslateInputs(e.target.value.trim());
    if (isNaN(val)) return;

    setInnerChanged(!innerChanged);
    dispatch(
      customActions.handleSetPosition({
        action: "set-translate",
        x: type === "x" ? +val : null,
        y: type === "y" ? +val : null,
      })
    );
  }

  // Create canvas context, and run clean up for cursor
  useEffect(() => {
    ctx.current = canvasEl.current.getContext("2d");

    return () => {
      dispatch(uiActions.handleCursor("default"));
      isHolding = false;
      isHover = false;
    };
  }, []);

  // Draw canvas for changing translates
  useEffect(() => {
    let x = handleOutsideXYCalc(translateX);
    let y = handleOutsideXYCalc(translateY);

    drawTranslateCanvas(x, y, ctx.current);
  }, [translateX, translateY]);

  // Handle isHover, and isHolding moving
  const handleMove = useCallback(
    throttle((offsetX, offsetY, tX, tY) => {
      if (isHolding) {
        const outsideX = offsetX - 10 / 2 <= 0 || offsetX + 10 + 5 >= 200;
        const outsideY = offsetY - 10 / 2 <= 0 || offsetY + 10 + 5 >= 200;

        dispatch(
          customActions.handleSetPosition({
            x: outsideX ? null : offsetX - 100,
            y: outsideY ? null : offsetY - 100,
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
    }, 8),
    []
  );

  // Handle translate canvas events
  useEffect(() => {
    const canvas = canvasEl.current;

    function handleMoveHandler(e) {
      e.preventDefault();
      const { offsetX, offsetY } = getOffsetXY(e);

      handleMove(
        offsetX,
        offsetY,
        handleOutsideXYCalc(translateX),
        handleOutsideXYCalc(translateY)
      );
    }

    function handleDownHandler(e) {
      const { offsetX, offsetY } = getOffsetXY(e);

      isHolding = true;
      dispatch(
        customActions.handleSetPosition({
          x: offsetX - 100,
          y: offsetY - 100,
          action: "set-translate",
        })
      );

      dispatch(uiActions.handleCursor("grab"));
    }

    function handleUpHandler() {
      if (!isHolding) return;

      if (isHover) dispatch(uiActions.handleCursor("move"));
      else dispatch(uiActions.handleCursor("default"));
      setIsReleased(!isReleased);
      isHolding = false;
    }
    function handleMouseOut() {
      isHolding = false;
      isHover = false;
      setIsReleased(!isReleased);
      dispatch(uiActions.handleCursor("default"));
    }

    canvas.addEventListener("touchstart", handleDownHandler);
    canvas.addEventListener("touchmove", handleMoveHandler);
    canvas.addEventListener("touchend", handleUpHandler);

    canvas.addEventListener("mousedown", handleDownHandler);
    canvas.addEventListener("mousemove", handleMoveHandler);
    canvas.addEventListener("mouseup", handleUpHandler);
    canvas.addEventListener("mouseout", handleMouseOut);

    return () => {
      canvas.removeEventListener("touchstart", handleDownHandler);
      canvas.removeEventListener("touchmove", handleMoveHandler);
      canvas.removeEventListener("touchend", handleUpHandler);

      canvas.removeEventListener("mouseout", handleMouseOut);
      canvas.removeEventListener("mousemove", handleMoveHandler);
      canvas.removeEventListener("mousedown", handleDownHandler);
      canvas.removeEventListener("mouseup", handleUpHandler);
    };
  }, [activeKeyFrame, position, innerChanged, isReleased]);

  return (
    <>
      <div className="flex items-center">
        <canvas
          ref={canvasEl}
          width={200}
          height={200}
          className="bg-slate-950"
        ></canvas>
      </div>
      <div className="flex items-center gap-2 mt-2 text-white">
        <p>X:</p>
        <input
          onChange={(e) => handleInputsHandler(e, "x")}
          className="w-16 p-1 bg-zinc-900"
          value={translateX}
        />
        <p>Y:</p>
        <input
          onChange={(e) => handleInputsHandler(e, "y")}
          className="w-16 p-1 bg-zinc-900"
          value={translateY}
        />
      </div>
    </>
  );
}
