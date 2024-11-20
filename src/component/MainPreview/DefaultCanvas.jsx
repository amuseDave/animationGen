import { useRef, useEffect } from "react";
import { drawDefaultCanvas } from "../../utils/handleCanvas";

export default function DefaultCanvas() {
  const canvasEl = useRef();

  useEffect(() => {
    canvasEl.current.width = 1920;
    canvasEl.current.height = 1080;
    const ctx = canvasEl.current.getContext("2d");
    drawDefaultCanvas(ctx);
  }, []);

  return (
    <canvas
      ref={canvasEl}
      id="generator"
      className={`absolute top-0 left-0 z-10 w-[1920px] h-[1080px] cursor-crosshair bg-zinc-950`}
    ></canvas>
  );
}
