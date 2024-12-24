import { useEffect } from "react";
import { useSelector } from "react-redux";
import cursorMove from "./assets/cursor-move.png";
import cursorGrab from "./assets/cursor-grab.png";
import cursorDefault from "./assets/cursor-default.png";

export default function CursorCanvas() {
  const cursor = useSelector((state) => state.ui.cursor);

  useEffect(() => {
    if (cursor === "move") {
      document.body.style.cursor = `url(${cursorMove}), auto`;
    } else if (cursor === "grab") {
      document.body.style.cursor = `url(${cursorGrab}), auto`;
    } else {
      document.body.style.cursor = `url(${cursorDefault}), auto`;
    }
  }, [cursor]);

  return null;
}
