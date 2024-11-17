import { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import handleCanvas from "../../utils/handleCanvas";

export default function MainPreview() {
  const { type } = useSelector((state) => state.ui);

  console.log(type);

  const canvasEl = useRef();
  const ctx = useRef();

  useEffect(() => {
    //create 2d context canvas on main preview load and save it as reference
    ctx.current = canvasEl.current.getContext("2d");
    canvasEl.current.width = canvasEl.current.offsetWidth;
    canvasEl.current.height = canvasEl.current.offsetHeight;
  }, []);

  useEffect(() => {
    function handleCanvasState(timeframe) {
      canvasEl.current.width = canvasEl.current.offsetWidth;
      canvasEl.current.height = canvasEl.current.offsetHeight;

      handleCanvas(canvasEl.current, ctx.current);
      requestAnimationFrame(handleCanvasState);
    }

    handleCanvasState();
  }, []);

  return (
    <section className="h-[700px] relative">
      <h2 className="absolute text-white top-5 left-5">Animation Name</h2>
      <canvas
        ref={canvasEl}
        id="generator"
        className="w-full h-full bg-zinc-950"
      ></canvas>
    </section>
  );
}
