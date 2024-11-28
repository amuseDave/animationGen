import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import drawCursor from "./utils/handleCursorCanvas";

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

  useEffect(() => {
    if (isTouchDevice) return;
    canvasEl.current.width = canvasEl.current.offsetWidth;
    canvasEl.current.height = canvasEl.current.offsetHeight;

    function handleMouseMove(e) {
      const { clientX, clientY } = e;

      drawCursor(clientX, clientY, ctx.current, cursor);

      cX = clientX;
      cY = clientY;
    }

    drawCursor(cX, cY, ctx.current, cursor);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.current.clearRect(0, 0, 4000, 4000);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isResizing, cursor]);

  return (
    <canvas
      ref={canvasEl}
      className="fixed z-[4000] top-0 left-0 h-[100dvh] w-[100dvw] pointer-events-none"
    ></canvas>
  );
}
