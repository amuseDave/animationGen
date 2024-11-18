import { useCallback, useEffect } from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { customActions } from "../../customSlicer";
import { throttle } from "lodash";
import handleCanvasCustomState, {
  getSquareSize,
} from "../../utils/handleCanvas";

export default function CustomCanvas() {
  const dispatch = useDispatch();
  const { position, isHovered, isHolding, square } = useSelector(
    (state) => state.custom
  );

  const canvasEl = useRef();
  const ctx = useRef();

  // Create ctx
  // Set start square position on resize window
  useEffect(() => {
    ctx.current = canvasEl.current.getContext("2d");
    function handleSetSizes() {
      canvasEl.current.width = canvasEl.current.offsetWidth;
      canvasEl.current.height = canvasEl.current.offsetHeight;
      dispatch(
        customActions.setStartPos({
          width: canvasEl.current.width,
          height: canvasEl.current.height,
        })
      );
    }

    handleSetSizes();
    window.addEventListener("resize", handleSetSizes);

    return () => {
      window.removeEventListener("resize", handleSetSizes);
    };
  }, []);
  // Set square start pos on position change
  useEffect(() => {
    dispatch(
      customActions.setStartPos({
        width: canvasEl.current.width,
        height: canvasEl.current.height,
      })
    );
  }, [position]);
  // Draw Canvas on square positiong change
  useEffect(() => {
    handleCanvasCustomState({
      width: canvasEl.current.width,
      height: canvasEl.current.height,
      ctx: ctx.current,
      square,
    });
  }, [square.x, square.y]);

  const handleMouseMovement = useCallback(
    throttle((e, square, isHolding, isHovered, width, height) => {
      if (isHolding) {
        dispatch(
          customActions.handleMovement({
            x: e.offsetX,
            y: e.offsetY,
            width,
            height,
          })
        );
        return;
      }

      const isHovering =
        e.offsetY >= square.y &&
        e.offsetY <= square.y + getSquareSize(width) &&
        e.offsetX >= square.x &&
        e.offsetX <= square.x + getSquareSize(height);

      if (isHovering && isHovered) return;

      if (isHovering) {
        dispatch(customActions.setHover());
      } else {
        dispatch(customActions.removeHover());
      }
    }, 8),
    []
  );
  const handleMouseDown = useCallback((e, square, isHovered) => {
    if (!isHovered) return;
    dispatch(customActions.setHolding());
    const offsetX = e.offsetX - square.x;
    const offsetY = e.offsetY - square.y;
    dispatch(customActions.setOffSets({ offsetX, offsetY }));
  }, []);
  const handleMouseUp = useCallback(() => {
    dispatch(customActions.removeHolding());
  }, []);

  useEffect(() => {
    const canvas = canvasEl.current;

    function handleMouseMovementHandler(e) {
      handleMouseMovement(
        e,
        square,
        isHolding,
        isHovered,
        canvas.width,
        canvas.height
      );
    }
    function handleMouseDownHandler(e) {
      handleMouseDown(e, square, isHovered);
    }
    function handleMouseUpHandler() {
      handleMouseUp();
    }

    canvas.addEventListener("mousemove", handleMouseMovementHandler);
    canvas.addEventListener("mousedown", handleMouseDownHandler);
    canvas.addEventListener("mouseup", handleMouseUpHandler);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMovementHandler);
      canvas.removeEventListener("mousedown", handleMouseDownHandler);
      canvas.removeEventListener("mouseup", handleMouseUpHandler);
    };
  }, [isHovered, isHolding, square.x, square.y]);

  return (
    <canvas
      ref={canvasEl}
      id="generator"
      className={`w-full h-full bg-zinc-950 rounded-2xl ${
        isHolding
          ? "cursor-grabbing"
          : isHovered
          ? "cursor-move"
          : "cursor-crosshair"
      }`}
    ></canvas>
  );
}
