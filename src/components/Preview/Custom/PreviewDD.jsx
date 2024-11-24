import { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { customActionsDD } from "../../../store/customDDSlicer";
import { throttle } from "lodash";
import handleCanvasCustomState, {
  getSquareSize,
} from "../../../utils/handleCanvas";
import Loader from "../Static/Loader";
import { uiActions } from "../../../store/uiSlicer";

export default function CustomCanvas() {
  const dispatch = useDispatch();

  const positionDD = useSelector((state) => state.customDD.positionDD);
  const isHovered = useSelector((state) => state.customDD.isHovered);
  const isHolding = useSelector((state) => state.customDD.isHolding);
  const square = useSelector((state) => state.customDD.square);
  const isAnimationCreatedDD = useSelector(
    (state) => state.customDD.isAnimationCreatedDD
  );

  const zoomLevel = useSelector((state) => state.ui.zoomLevel);
  const isResizing = useSelector((state) => state.ui.isResizing);
  const isAnimating = useSelector((state) => state.ui.isAnimating);

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

  // Update canvas size
  // handle specific user event
  useEffect(() => {
    canvasEl.current.width = canvasEl.current.offsetWidth;
    canvasEl.current.height = canvasEl.current.offsetHeight;

    if (isHolding) {
      dispatch(customActionsDD.handleHolding(false));
      dispatch(customActionsDD.handleAnimation({ action: "reset-animation" }));
    }
  }, [isResizing]);

  // Update starting pos & animation
  useEffect(() => {
    if (isHolding || isResizing) return;
    // Update animation positions on resize
    if (isAnimationCreatedDD) {
      dispatch(
        customActionsDD.handleUpdateAnimationsPositions({
          width: canvasEl.current.width,
          height: canvasEl.current.height,
          zoomLevel,
        })
      );
    } else {
      // Update starting position
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
    if (isAnimating || isResizing) return;

    handleCanvasCustomState({
      width: canvasEl.current.width,
      height: canvasEl.current.height,
      ctx: ctx.current,
      square: square.animations[square.animationIndex],
      zoomLevel,
    });
  }, [
    square.animations[square.animationIndex],
    isResizing,
    zoomLevel,
    isHolding,
    isAnimationCreatedDD,
  ]);

  // Handle Animation Drawing on Canvas
  useEffect(() => {
    if (!isAnimating) return;

    const canvas = canvasEl.current;
    //

    const curIndex =
      square.animationIndex === square.animations.length - 1
        ? 0
        : square.animationIndex;

    square.animations.slice(curIndex).forEach((animation, index, arr) => {
      const timeout = setTimeout(
        () => {
          // Draw canvas loop
          handleCanvasCustomState({
            width: canvas.width,
            height: canvas.height,
            ctx: ctx.current,
            square: { x: animation.x, y: animation.y },
            zoomLevel,
          });

          dispatch(
            customActionsDD.handleAnimation({
              action: "set-index",
              animationIndex: curIndex + index,
            })
          );

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
        e.offsetY >= square.animations[square.animationIndex].y &&
        e.offsetY <=
          square.animations[square.animationIndex].y +
            getSquareSize(width, zoomLevel) &&
        e.offsetX >= square.animations[square.animationIndex].x &&
        e.offsetX <=
          square.animations[square.animationIndex].x +
            getSquareSize(width, zoomLevel);

      if (isHovering && isHovered) return;

      if (isHovering) {
        dispatch(uiActions.handleCursor("move"));
        dispatch(customActionsDD.handleHover(true));
      } else {
        dispatch(uiActions.handleCursor("default"));
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
    const offsetX = e.offsetX - square.animations[square.animationIndex].x;
    const offsetY = e.offsetY - square.animations[square.animationIndex].y;
    dispatch(customActionsDD.handleSetOffSets({ offsetX, offsetY }));
    dispatch(uiActions.handleCursor("grab"));
  }, []);
  // Set isHolding to false
  const handleMouseUp = useCallback(() => {
    dispatch(uiActions.handleCursor("default"));
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
    isAnimationCreatedDD,
    zoomLevel,
    square.animations[square.animationIndex],
  ]);

  return (
    <>
      <canvas
        ref={canvasEl}
        id="generator"
        className={`${isResizing && "hidden"} w-full relative h-full z-20`}
      ></canvas>
      {isResizing && <Loader />}
    </>
  );
}
