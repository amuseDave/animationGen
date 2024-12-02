import { useEffect, useRef } from "react";

export default function Link({ copyLink }) {
  const linkEl = useRef();

  useEffect(() => {
    const range = document.createRange();
    range.selectNodeContents(linkEl.current);

    const selection = window.getSelection();
    selection.removeAllRanges(); // Clear any previous selections
    selection.addRange(range); // Select the content of the span
  }, []);

  return (
    <span ref={linkEl} className="text-sm select-text">
      {copyLink}
    </span>
  );
}
