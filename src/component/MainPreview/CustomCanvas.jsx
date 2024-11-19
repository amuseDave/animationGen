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
  } = useSelector((state) => state.custom);

  const canvasEl = useRef();
  const ctx = useRef();
  const timeouts = useRef([]);

  // Create ctx
  // Set start square position on resize window
  // Handle isResizing to not animate
  useEffect(() => {
    ctx.current = canvasEl.current.getContext("2d");

    let timeoutId;

    function handleSetSizes() {
      canvasEl.current.width = canvasEl.current.offsetWidth;
      canvasEl.current.height = canvasEl.current.offsetHeight;
      dispatch(
        customActions.handlePositions({
          width: canvasEl.current.width,
          height: canvasEl.current.height,
          action: "update-positions",
        })
      );

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        dispatch(
          customActions.handleUpdateAnimationsPositions({
            width: canvasEl.current.width,
            height: canvasEl.current.height,
          })
        );
      }, 200);
    }
    handleSetSizes();
    window.addEventListener("resize", handleSetSizes);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleSetSizes);
    };
  }, []);
  // Set square start pos on position change
  // Set back default pos if animation vas invalid, on isHolding change
  useEffect(() => {
    if (isHolding || isAnimating) return;
    dispatch(
      customActions.handlePositions({
        width: canvasEl.current.width,
        height: canvasEl.current.height,
        action: "update-positions",
      })
    );
  }, [position, isHolding, isAnimating]);
  // Draw Canvas on square positiong change
  useEffect(() => {
    handleCanvasCustomState({
      width: canvasEl.current.width,
      height: canvasEl.current.height,
      ctx: ctx.current,
      square,
    });
  }, [square.x, square.y, window.innerHeight]);

  // Handle Animation Drawing on Canvas
  useEffect(() => {
    if (!isAnimating) return;

    const canvas = canvasEl.current;
    console.log(square);

    square.animations.forEach((animation, index, arr) => {
      const timeout = setTimeout(
        () => {
          handleCanvasCustomState({
            width: canvas.width,
            height: canvas.height,
            ctx: ctx.current,
            square: { x: animation.x, y: animation.y },
          });
          if (arr.length - 1 === index) {
            dispatch(
              customActions.handleAnimation({
                action: "setAnimating",
                isAnimating: false,
              })
            );
          }
        },
        8 * index,
        [index]
      );

      timeouts.current.push(timeout);
    });

    return () => {
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];
    };
  }, [isAnimating]);

  //
  /**
   * @info Create callback functions to not change on re-renders to save performence.
   **/
  // Handle isHovered
  // Handle animation set animation movement if isHovered
  const handleHoverAndAnimation = useCallback(
    throttle((e, square, isHolding, isHovered, width, height) => {
      // Handle Animation Movement
      if (isHolding) {
        dispatch(
          customActions.handleSetAnimationMovement({
            x: e.offsetX,
            y: e.offsetY,
            width,
            height,
          })
        );
        return;
      }

      // Set is Hovering
      const isHovering =
        e.offsetY >= square.y &&
        e.offsetY <= square.y + getSquareSize(width) &&
        e.offsetX >= square.x &&
        e.offsetX <= square.x + getSquareSize(width);

      if (isHovering && isHovered) return;

      if (isHovering) {
        dispatch(customActions.handleHover(true));
      } else {
        dispatch(customActions.handleHover(false));
      }
    }, 8),
    []
  );
  // Sets isHolding
  // Sets initial mousedown offset
  const handleMouseDown = useCallback((e, square, isHovered) => {
    if (!isHovered) return;
    dispatch(customActions.handleHolding(true));
    const offsetX = e.offsetX - square.x;
    const offsetY = e.offsetY - square.y;
    dispatch(customActions.handleSetOffSets({ offsetX, offsetY }));
  }, []);
  // Set isHolding to false
  const handleMouseUp = useCallback(() => {
    dispatch(customActions.handleAnimation({ action: "set" }));
    dispatch(customActions.handleHolding(false));
    dispatch(customActions.handleHover(false));
  }, []);

  // Handle events, and pass down arguments to functions
  useEffect(() => {
    if (isAnimationCreated) return;

    const canvas = canvasEl.current;

    function handleHoverAndAnimationHandler(e) {
      handleHoverAndAnimation(
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

    canvas.addEventListener("mousemove", handleHoverAndAnimationHandler);
    canvas.addEventListener("mousedown", handleMouseDownHandler);
    canvas.addEventListener("mouseup", handleMouseUpHandler);

    return () => {
      canvas.removeEventListener("mousemove", handleHoverAndAnimationHandler);
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
