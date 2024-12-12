import { useSelector } from "react-redux";
import { useEffect } from "react";
import parse from "html-react-parser";

export default function Layout() {
  const zoomLevel = useSelector((state) => state.ui.zoomLevel);
  const animation = useSelector((state) => state.featured.animation);

  const parentStyles = {
    width: `${25 * zoomLevel}dvw`,
    height: `${25 * zoomLevel}dvw`,
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = animation.css;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [animation.css]);

  useEffect(() => {
    document.querySelector(`.${animation.class}`).style.scale = zoomLevel;
  }, [zoomLevel]);

  return (
    <section
      style={parentStyles}
      className="absolute flex items-center justify-center cc"
    >
      {parse(animation.html)}
    </section>
  );
}
