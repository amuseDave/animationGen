import { useEffect } from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { customActions } from "../../customSlicer";
import handleCanvasCustomState, {
  getSquareSize,
} from "../../utils/handleCanvas";

export default function CustomCanvas() {
  const dispatch = useDispatch();
  const { position, isHovered, isHolding, type } = useSelector(
    (state) => state.custom
  );
  const square = useSelector((state) => state.custom.square);

  const canvasEl = useRef();
  const ctx = useRef();

  // Set canvas size, square size, and dashed box size&pos, with resize event
  useEffect(() => {
    ctx.current = canvasEl.current.getContext("2d");

    function handleSetSizes() {
      console.log("adding the resize");
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

  // Set square pos
  useEffect(() => {
    dispatch(
      customActions.setStartPos({
        width: canvasEl.current.width,
        height: canvasEl.current.height,
      })
    );
  }, [position]);

  // Draw Canvas
  useEffect(() => {
    handleCanvasCustomState({
      width: canvasEl.current.width,
      height: canvasEl.current.height,
      ctx: ctx.current,
      square,
    });
  }, [square.x, square.y]);

  useEffect(() => {
    const canvas = canvasEl.current;

    // Handle if it's hovering on square state, and add movement to animations array
    function handleMouseMoveCanvas(e) {
      if (isHolding) {
        dispatch(
          customActions.handleMovement({
            x: e.offsetX,
            y: e.offsetY,
            width: canvasEl.current.width,
            height: canvasEl.current.height,
          })
        );
        // Handle return to not run unecessary code function
        return;
      }

      if (
        e.offsetY >= square.y &&
        e.offsetY <= square.y + getSquareSize(canvasEl.current.width) &&
        e.offsetX >= square.x &&
        e.offsetX <= square.x + getSquareSize(canvasEl.current.width)
      ) {
        dispatch(customActions.setHover());
      } else {
        dispatch(customActions.removeHover());
      }
    }

    // Set mouse down offset position if hovered is true
    function handleMouseDown(e) {
      if (!isHovered) return;

      dispatch(customActions.setHolding());
      const offsetX = e.offsetX - square.x;
      const offsetY = e.offsetY - square.y;

      dispatch(customActions.setOffSets({ offsetX, offsetY }));
    }

    // Remove holding state
    function handleMouseUp() {
      dispatch(customActions.removeHolding());
    }

    canvas.addEventListener("mousemove", handleMouseMoveCanvas);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMoveCanvas);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isHolding, isHovered, square.x, square.y]);

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
