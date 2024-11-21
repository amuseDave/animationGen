import { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { customActionsDD } from "../../store/customDDSlicer";
import { throttle } from "lodash";
import handleCanvasCustomState, {
  getSquareSize,
} from "../../store/handleCanvas";
import { Loader } from "lucide-react";
import { uiActions } from "../../store/uiSlicer";

export default function CustomCanvas() {
  const dispatch = useDispatch();
  const { positionDD, isHovered, isHolding, square, isAnimationCreatedDD } =
    useSelector((state) => state.customDD);
  const { zoomLevel, isResizing, isAnimating } = useSelector(
    (state) => state.ui
  );

  const canvasEl = useRef();
  const ctx = useRef();
  const timeouts = useRef([]);

  // Create ctx // clean up isAnimating
  useEffect(() => {
    ctx.current = canvasEl.current.getContext("2d");
    return () => {
      dispatch(uiActions.handleIsAnimating(false));
    };
  }, []);

  // Update animation positions
  useEffect(() => {
    if (isHolding || isResizing) return;

    canvasEl.current.width = canvasEl.current.offsetWidth;
    canvasEl.current.height = canvasEl.current.offsetHeight;

    if (isAnimationCreatedDD) {
      // Update animation track positions
      dispatch(
        customActionsDD.handleUpdateAnimationsPositions({
          width: canvasEl.current.width,
          height: canvasEl.current.height,
          zoomLevel,
        })
      );
    } else {
      // set square start pos
      dispatch(
        customActionsDD.handleSetPositions({
          actionType: "update-position",
          width: canvasEl.current.width,
          height: canvasEl.current.height,
          zoomLevel,
        })
      );
    }
  }, [zoomLevel, isResizing, positionDD, isHolding, isAnimationCreatedDD]);

  // Draw Canvas
  useEffect(() => {
    if (isAnimating) return;

    handleCanvasCustomState({
      width: canvasEl.current.width,
      height: canvasEl.current.height,
      ctx: ctx.current,
      square,
      zoomLevel,
    });
  }, [
    square.x,
    square.y,
    window.innerHeight,
    zoomLevel,
    isHolding,
    isAnimationCreatedDD,
  ]);

  // Handle Animation Drawing on Canvas
  useEffect(() => {
    if (!isAnimating) return;

    const canvas = canvasEl.current;

    square.animations.forEach((animation, index, arr) => {
      const timeout = setTimeout(
        () => {
          handleCanvasCustomState({
            width: canvas.width,
            height: canvas.height,
            ctx: ctx.current,
            square: { x: animation.x, y: animation.y },
            zoomLevel,
          });
          if (arr.length - 1 === index) {
            dispatch(uiActions.handleIsAnimating(false));
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
  // Set isHovered
  // Handle animation animation movement if hovered and holding
  const handleHoverAndAnimation = useCallback(
    throttle((e, square, isHolding, isHovered, width, height, zoomLevel) => {
      // Handle Animation Movement
      if (isHolding) {
        dispatch(
          customActionsDD.handleSetAnimationMovement({
            x: e.offsetX,
            y: e.offsetY,
            width,
            height,
            zoomLevel,
          })
        );
        return;
      }

      // Set is Hovering
      const isHovering =
        e.offsetY >= square.y &&
        e.offsetY <= square.y + getSquareSize(width, zoomLevel) &&
        e.offsetX >= square.x &&
        e.offsetX <= square.x + getSquareSize(width, zoomLevel);

      if (isHovering && isHovered) return;

      if (isHovering) {
        dispatch(customActionsDD.handleHover(true));
      } else {
        dispatch(customActionsDD.handleHover(false));
      }
    }, 8),
    []
  );
  // Sets isHolding
  // Sets initial mousedown offset
  const handleMouseDown = useCallback((e, square, isHovered) => {
    if (!isHovered) return;
    dispatch(customActionsDD.handleHolding(true));
    const offsetX = e.offsetX - square.x;
    const offsetY = e.offsetY - square.y;
    dispatch(customActionsDD.handleSetOffSets({ offsetX, offsetY }));
  }, []);
  // Set isHolding to false
  const handleMouseUp = useCallback(() => {
    dispatch(customActionsDD.handleAnimation({ action: "set-animation" }));
  }, []);

  // Handle events, and pass down arguments to functions
  useEffect(() => {
    if (isAnimationCreatedDD) return;

    const canvas = canvasEl.current;

    function handleHoverAndAnimationHandler(e) {
      handleHoverAndAnimation(
        e,
        square,
        isHolding,
        isHovered,
        canvas.width,
        canvas.height,
        zoomLevel
      );
    }
    function handleMouseDownHandler(e) {
      handleMouseDown(e, square, isHovered);
    }
    function handleMouseUpHandler() {
      if (!isHolding) return;
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
  }, [
    isHovered,
    isHolding,
    square.x,
    square.y,
    isAnimationCreatedDD,
    zoomLevel,
  ]);

  return (
    <>
      <canvas
        ref={canvasEl}
        id="generator"
        className={`${isResizing && "hidden"} w-full relative h-full z-20 ${
          isHolding
            ? "cursor-grabbing"
            : isHovered
            ? "cursor-move"
            : "cursor-crosshair"
        }`}
      ></canvas>
      {isResizing && <Loader />}
    </>
  );
}
