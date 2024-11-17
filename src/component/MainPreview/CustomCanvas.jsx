import { useEffect } from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import handleCanvasState from "../../utils/handleCanvas";
import { customActions } from "../../customSlicer";

export default function CustomCanvas() {
  const { position, isHovered, isHolding } = useSelector(
    (state) => state.custom
  );
  const { width, height } = useSelector((state) => state.custom.canvasSize);
  const square = useSelector((state) => state.custom.square);

  const dispatch = useDispatch();

  const canvasEl = useRef();
  const ctx = useRef();

  useEffect(() => {
    ctx.current = canvasEl.current.getContext("2d");
  });

  useEffect(() => {
    const canvas = canvasEl.current;

    function updateCustomCanvasState() {
      const { offsetWidth, offsetHeight } = canvas;

      canvas.width = offsetWidth;
      canvas.height = offsetHeight;

      dispatch(
        customActions.setSizes({
          width: canvas.width,
          height: canvas.height,
        })
      );
    }

    function handleCanvasCustomState() {
      updateCustomCanvasState();

      handleCanvasState({
        canvas: { width, height },
        square,
        ctx: ctx.current,
      });
    }

    function handleMouseMoveCanvas(e) {
      if (isHolding) {
        dispatch(customActions.handleMovement({ x: e.offsetX, y: e.offsetY }));
      }

      if (
        e.offsetY >= square.y &&
        e.offsetY <= square.y + square.squareSize &&
        e.offsetX >= square.x &&
        e.offsetX <= square.x + square.squareSize
      ) {
        dispatch(customActions.setHover());
      } else {
        dispatch(customActions.removeHover());
      }
    }

    function handleMouseDown(e) {
      if (!isHovered) return;
      dispatch(customActions.setHolding());

      const offsetX = e.offsetX - square.x;
      const offsetY = e.offsetY - square.y;

      dispatch(customActions.setOffSets({ offsetX, offsetY }));
    }

    function handleMouseUp() {
      dispatch(customActions.removeHolding());
    }

    handleCanvasCustomState();
    window.addEventListener("resize", handleCanvasCustomState);
    canvas.addEventListener("mousemove", handleMouseMoveCanvas);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("resize", handleCanvasCustomState);
      canvas.removeEventListener("mousemove", handleMouseMoveCanvas);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [position, width, square.x, square.y, height, isHovered, isHolding]);

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
