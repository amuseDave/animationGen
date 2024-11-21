import { useRef, useEffect } from "react";
import { drawDefaultCanvas } from "../../../store/handleCanvas";

export default function DefaultCanvas() {
  const defaultCanvas = useRef();

  useEffect(() => {
    defaultCanvas.current.width = 1920;
    defaultCanvas.current.height = 1080;
    const ctx = defaultCanvas.current.getContext("2d");
    drawDefaultCanvas(ctx);
  }, []);
  return (
    <canvas
      ref={defaultCanvas}
      id="generator"
      className={`absolute top-0 left-0 z-10 w-[1920px] h-[1080px] cursor-crosshair bg-zinc-950`}
    ></canvas>
  );
}
