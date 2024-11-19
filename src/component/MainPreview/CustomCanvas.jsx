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
  const {
    position,
    isHovered,
    isHolding,
    square,
    isAnimating,
    isAnimationCreated,
    isResizing,
  } = useSelector((state) => state.custom);

  const canvasEl = useRef();
  const ctx = useRef();
  const timeouts = useRef([]);

  // Create ctx
  // Set start square position on resize window
  // Handle isResizing to not animate
  useEffect(() => {
    ctx.current = canvasEl.current.getContext("2d");

    let initialResize = false;
    let timeoutId;

    function handleSetSizes() {
      canvasEl.current.width = canvasEl.current.offsetWidth;
      canvasEl.current.height = canvasEl.current.offsetHeight;

      if (isAnimating && initialResize) dispatch(customActions.setResizing());
      initialResize ||= true;

      dispatch(
        customActions.setStartPos({
          width: canvasEl.current.width,
          height: canvasEl.current.height,
        })
      );

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        dispatch(customActions.resetResizing());
      }, 50);
    }

    handleSetSizes();
    window.addEventListener("resize", handleSetSizes);

    return () => {
      dispatch(customActions.resetResizing());
      window.removeEventListener("resize", handleSetSizes);
    };
  }, []);
  // Set square start pos on position change
  // Set back default pos if animation vas invalid, on isHolding change
  useEffect(() => {
    dispatch(
      customActions.setStartPos({
        width: canvasEl.current.width,
        height: canvasEl.current.height,
      })
    );
  }, [position, isHolding]);
  // Draw Canvas on square positiong change
  useEffect(() => {
    handleCanvasCustomState({
      width: canvasEl.current.width,
      height: canvasEl.current.height,
      ctx: ctx.current,
      square,
    });
  }, [square.x, square.y]);

  // Handle Animation Drawing on Canvas
  useEffect(() => {
    if (!isAnimating) return;

    const canvas = canvasEl.current;

    square.animations.forEach((animation, index) => {
      const timeout = setTimeout(() => {
        handleCanvasCustomState({
          width: canvas.width,
          height: canvas.height,
          ctx: ctx.current,
          square: { x: animation.x, y: animation.y },
        });
      }, 8 * index);

      timeouts.current.push(timeout);
    });

    () => {
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];
    };
  }, [isAnimating]);

  // Clear all timeouts when resizing
  // useEffect(() => {
  //   if (isResizing && isAnimating) {
  //     timeouts.current.forEach(clearTimeout);
  //     timeouts.current = [];
  //   }
  // }, [isResizing]);

  //
  /**
   * @info Create callback functions to not change on re-renders to save performence.
   **/
  // Sets isHovered with logic
  // Dispatch logic if isHolding
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
        e.offsetX <= square.x + getSquareSize(width);

      if (isHovering && isHovered) return;

      if (isHovering) {
        dispatch(customActions.setHover());
      } else {
        dispatch(customActions.removeHover());
      }
    }, 8),
    []
  );
  // Sets isHolding
  // Sets initial mousedown offset
  const handleMouseDown = useCallback((e, square, isHovered) => {
    if (!isHovered) return;
    dispatch(customActions.setHolding());
    const offsetX = e.offsetX - square.x;
    const offsetY = e.offsetY - square.y;
    dispatch(customActions.setOffSets({ offsetX, offsetY }));
  }, []);
  // Set isHolding to false
  const handleMouseUp = useCallback(() => {
    dispatch(customActions.removeHolding());
  }, []);

  // Handle events, and pass down arguments to functions
  useEffect(() => {
    if (isAnimationCreated) return;

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
  }, [isHovered, isHolding, square.x, square.y, isAnimationCreated]);

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
