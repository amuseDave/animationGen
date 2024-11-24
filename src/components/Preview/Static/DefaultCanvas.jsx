import { useRef, useEffect } from "react";
import { drawDefaultCanvas } from "../../../utils/handleCanvas";

export default function DefaultCanvas() {
  const defaultCanvas = useRef();

  useEffect(() => {
    defaultCanvas.current.width = 2560;
    defaultCanvas.current.height = 1440;

    const ctx = defaultCanvas.current.getContext("2d");
    drawDefaultCanvas(ctx);
  }, []);
  return (
    <canvas
      ref={defaultCanvas}
      id="generator"
      className={`fixed top-0 left-0 bottom-0 right-0 z-0 cursor-none bg-background transition-colors`}
    ></canvas>
  );
}
