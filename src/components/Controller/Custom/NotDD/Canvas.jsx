import { uiActions } from "../../../../store/uiSlicer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useCallback, useState } from "react";
import { drawTranslateCanvas } from "../../../../utils/handleCursorCanvas";
import { customActions } from "../../../../store/customSlicer";
import {
  getOffsetXY,
  convertTranslateValueToOffSetXY,
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

  const reset = useSelector((state) => state.custom.reset);
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
    const val = handleTranslateInputs(e.target.value.trim(), 400);
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
    let x = convertTranslateValueToOffSetXY(translateX);
    let y = convertTranslateValueToOffSetXY(translateY);

    drawTranslateCanvas(x, y, ctx.current);
  }, [translateX, translateY]);

  // Handle isHover, and isHolding moving
  const handleMove = useCallback(
    throttle((offsetX, offsetY, tX, tY) => {
      if (isHolding) {
        const outsideX = offsetX - 10 <= 0 || offsetX + 10 >= 250;
        const outsideY = offsetY - 10 <= 0 || offsetY + 10 >= 250;

        dispatch(
          customActions.handleSetPosition({
            x: outsideX ? undefined : offsetX - 125,
            y: outsideY ? undefined : offsetY - 125,
            action: "set-translate",
          })
        );

        return;
      }

      const isHovered =
        offsetX >= tX - 10 &&
        offsetX <= tX + 10 &&
        offsetY >= tY - 10 &&
        offsetY <= tY + 10;

      if (isHovered && isHover) return;

      if (isHovered) {
        dispatch(uiActions.handleCursor("move"));
        isHover = true;
      } else {
        dispatch(uiActions.handleCursor("default"));
        isHover = false;
      }
    }, 4),
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
        convertTranslateValueToOffSetXY(translateX),
        convertTranslateValueToOffSetXY(translateY)
      );
    }

    function handleDownHandler(e) {
      const { offsetX, offsetY } = getOffsetXY(e);

      isHolding = true;

      dispatch(
        customActions.handleSetPosition({
          x: offsetX - 125,
          y: offsetY - 125,
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
  }, [activeKeyFrame, position, innerChanged, isReleased, reset]);

  return (
    <>
      <div
        className="control-canvas"
        style={{ width: "250px", height: "250px" }}
      >
        <div className="absolute z-0 w-[1px] h-full bg-[#222928] cc"></div>
        <div className="absolute z-0 h-[1px] w-full bg-[#222928] cc"></div>

        <canvas
          width={250}
          height={250}
          ref={canvasEl}
          className="relative z-10"
        ></canvas>

        <div
          className={`control-canvas-translateX-box ${
            isHolding ? "z-0" : "z-10"
          }`}
        >
          <div className="control-square-box control-canvas-box">x</div>
          <input
            style={{ width: `${`${translateX}`.length * 8 + 12}px` }}
            onChange={(e) => handleInputsHandler(e, "x")}
            className="control-value-input text-[#556664] font-medium"
            value={translateX}
          />
        </div>

        <div
          className={`control-canvas-translateY-box ${
            isHolding ? "z-0" : "z-10"
          }`}
        >
          <div className="control-square-box control-canvas-box">y</div>
          <input
            style={{ width: `${`${translateY}`.length * 8 + 12}px` }}
            onChange={(e) => handleInputsHandler(e, "y")}
            className="control-value-input text-[#556664] font-medium"
            value={translateY}
          />
        </div>
      </div>
    </>
  );
}
