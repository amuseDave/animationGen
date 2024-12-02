import { useDispatch } from "react-redux";
import { animationActions } from "../../../store/animationsSlicer";
import { useEffect, useRef, useState } from "react";

export default function AnimationName({ animationName, className }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef();
  const timeoutId = useRef();

  function handleUpdateName(e) {
    const name = e.target.value.replaceAll("  ", "");

    // Handle alert if name is too short or too long
    if (name.length > 20) return;
    dispatch(animationActions.handleCustomUpdateName(name));
  }

  function handleSetDefaultName() {
    setIsOpen(false);
    if (animationName === "") {
      dispatch(animationActions.handleCustomUpdateName("No Name"));
    }
  }

  useEffect(() => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      dispatch(animationActions.handleClearAnimationAlert());
    }, 500);
  }, [animationName]);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current.focus();
  }, [isOpen]);

  return (
    <>
      {isOpen ? (
        <input
          ref={inputRef}
          onBlur={handleSetDefaultName}
          onChange={handleUpdateName}
          value={animationName}
          className={`${className} bg-transparent outline-none w-full`}
        />
      ) : (
        <p
          onDoubleClick={() => {
            setIsOpen(true);
          }}
          className={`${className} w-full`}
        >
          {animationName}
        </p>
      )}
    </>
  );
}
