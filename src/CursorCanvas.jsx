import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import drawCursor from "./utils/handleCursorCanvas";
import { throttle } from "lodash";

let cX = 0;
let cY = 0;

let isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

export default function CursorCanvas() {
  const isResizing = useSelector((state) => state.ui.isResizing);
  const cursor = useSelector((state) => state.ui.cursor);

  const ctx = useRef();
  const canvasEl = useRef();

  useEffect(() => {
    ctx.current = canvasEl.current.getContext("2d");
  }, []);

  useEffect(() => {
    isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }, [isResizing]);

  const handleMouseMove = useCallback(
    throttle((e, cursor) => {
      const { clientX, clientY } = e;
      drawCursor(clientX, clientY, ctx.current, cursor);
      cX = clientX;
      cY = clientY;
    }, 8),
    [] // Dependency
  );

  useEffect(() => {
    if (isTouchDevice) return;
    canvasEl.current.width = canvasEl.current.offsetWidth;
    canvasEl.current.height = canvasEl.current.offsetHeight;

    drawCursor(cX, cY, ctx.current, cursor);

    function handleMouseMoveHandler(e) {
      handleMouseMove(e, cursor);
    }

    window.addEventListener("mousemove", handleMouseMoveHandler);

    return () => {
      ctx.current.clearRect(0, 0, 4000, 4000);
      window.removeEventListener("mousemove", handleMouseMoveHandler);
    };
  }, [isResizing, cursor]);

  return (
    <canvas
      ref={canvasEl}
      className="fixed z-[1000] top-0 left-0 h-[100dvh] w-[100dvw] pointer-events-none"
    ></canvas>
  );
}
