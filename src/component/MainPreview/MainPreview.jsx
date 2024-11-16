import { useEffect } from "react";
import { useRef } from "react";

export default function MainPreview({ type }) {
  const canvasEl = useRef();
  console.log(type, ": controller type");

  useEffect(() => {
    const animationPreview = canvasEl.current.getContext("2d");

    animationPreview;
  }, []);

  return (
    <section className="h-[600px] relative">
      <canvas ref={canvasEl} id="generator"></canvas>
    </section>
  );
}
