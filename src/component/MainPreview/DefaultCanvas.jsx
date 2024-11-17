import { useRef, useEffect } from "react";
import { drawDefaultCanvas } from "../../utils/handleCanvas";

export default function DefaultCanvas() {
  const canvasEl = useRef();
  const ctx = useRef();

  useEffect(() => {
    ctx.current = canvasEl.current.getContext("2d");
  });

  useEffect(() => {
    function updateCanvasSize() {
      canvasEl.current.width = canvasEl.current.offsetWidth;
      canvasEl.current.height = canvasEl.current.offsetHeight;
    }

    function handleDefaultCanvas() {
      updateCanvasSize();
      drawDefaultCanvas(
        canvasEl.current.width,
        canvasEl.current.height,
        ctx.current
      );
    }

    window.addEventListener("resize", handleDefaultCanvas);
    handleDefaultCanvas();

    return () => {
      window.removeEventListener("resize", handleDefaultCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasEl}
      id="generator"
      className={`w-full h-full bg-zinc-950 rounded-2xl cursor-crosshair`}
    ></canvas>
  );
}
